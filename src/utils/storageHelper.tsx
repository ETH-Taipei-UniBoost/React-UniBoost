export const getLocalStorage = () => {
  const data = localStorage.getItem('staked')
  return JSON.parse(data ?? '{}')
}

export const setLocalStorage = (input: any) => {
  localStorage.setItem('staked', JSON.stringify(input))
}

export const addStakedTokenId = (address: string, id: string) => {
  const data: Data = getLocalStorage()
  if (!Object.keys(data).includes(address)) {
    data[address] = [id]
  } else {
    data[address].push(id)
  }
  setLocalStorage(data)
}
export const removeStakedTokenId = (address: string, _id: string) => {
  const data: Data = getLocalStorage()
  data[address] = data[address].filter(id => id !== _id)

  setLocalStorage(data)
}

interface Data {
  [pool: string]: string[]
}

