import React, { useMemo } from 'react';

import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Box from '@material-ui/core/Box';
import TableSortLabel from '@material-ui/core/TableSortLabel'

import "./styles.css"

import { useTable, useSortBy } from 'react-table'


function Table(props) {
    const data = useMemo(
        () => props.data.map((el, ind) => {
            el.index = ind;
            return el;
        }),
        [props]
    )

    const columns = useMemo(
        () => [
            {
                Header: 'Index',
                accessor: 'index',
            },
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Box ID',
                accessor: 'box_id',
            },
            {
                Header: 'Sensor type',
                accessor: 'sensor_type',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Range l',
                accessor: 'range_l',
            },
            {
                Header: 'Range u',
                accessor: 'range_u',
            },
            {
                Header: 'Reading',
                accessor: 'reading',
            },
            {
                Header: 'Unit',
                accessor: 'unit',
            },
            {
                Header: 'Reading TS',
                accessor: 'reading_ts',
            }
        ],
        []
    )

    const {
        getTableProps, headerGroups, prepareRow, rows,
    } = useTable({ columns, data }, useSortBy)


    return (
        <Box height={'100%'} width={'100%'}>
            <MaUTable {...getTableProps()} style={{
                height: "100%",
                width: "100%",
                position: 'relative'// This will force the table body to overflow and scroll, since there is not enough room
            }}>
                <TableHead>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <TableSortLabel
                                        active={column.isSorted}
                                        // react-table has a unsorted state which is not treated here
                                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <TableCell {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </MaUTable>
        </Box>
    );

}

export default Table;