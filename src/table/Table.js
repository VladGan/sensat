import React, { useMemo } from 'react';

import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import PropTypes from 'prop-types';

import TableToolbar from './TableToolbar';
import TablePaginationActions from './TablePaginationAction';
import './styles.css';

import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';

function Table({ data, setData }) {
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
      },
    ],
    [],
  );

  const addSensorDataHandler = (user) => {
    user.index = data.length + 1;
    const newData = data.concat([user]);
    setData(newData);
  };

  const removeByIndexs = (array, indexs) => array.filter((_, i) => !indexs.includes(i));

  const deleteSensorHandler = (event) => {
    const newData = removeByIndexs(
      data,
      Object.keys(selectedRowIds).map((x) => parseInt(x, 10)),
    );
    setData(newData);
  };

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
  );

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };

  return (
    <Box width="100%">
      <TableToolbar
        numSelected={Object.keys(selectedRowIds).length}
        deleteSensorHandler={deleteSensorHandler}
        addSensorDataHandler={addSensorDataHandler}
      />
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  {...(column.id === 'reading_ts' || column.id === 'sensor_type'
                    ? column.getHeaderProps(column.getSortByToggleProps())
                    : column.getHeaderProps())}
                >
                  {column.render('Header')}
                  {(column.id === 'reading_ts'
                    || column.id === 'sensor_type') && (
                    <TableSortLabel
                      active={column.isSorted}
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={data.length}
              rowsPerPage={pageSize}
              page={pageIndex}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </MaUTable>
    </Box>
  );
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
};

export default Table;
