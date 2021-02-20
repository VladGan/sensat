import namor from 'namor'

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = () => {
  const statusChance = Math.random()
  return {
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    name1: namor.generate({ words: 1, numbers: 0 }),
    name2: namor.generate({ words: 1, numbers: 0 }),
    name3: namor.generate({ words: 1, numbers: 0 }),
    name4: namor.generate({ words: 1, numbers: 0 }),
    name5: namor.generate({ words: 1, numbers: 0 }),
    name6: namor.generate({ words: 1, numbers: 0 }),
    name7: namor.generate({ words: 1, numbers: 0 }),
    name8: namor.generate({ words: 1, numbers: 0 }),
    name9: namor.generate({ words: 1, numbers: 0 }),
    name10: namor.generate({ words: 1, numbers: 0 }),
    name11: namor.generate({ words: 1, numbers: 0 }),
    name12: namor.generate({ words: 1, numbers: 0 }),
    name13: namor.generate({ words: 1, numbers: 0 }),
    name14: namor.generate({ words: 1, numbers: 0 }),
    name15: namor.generate({ words: 1, numbers: 0 }),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? 'relationship'
        : statusChance > 0.33
        ? 'complicated'
        : 'single',
  }
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}
