/**
 * 錢包地址 ---> 只留頭尾的錢包地址
 * @param {string} str 
 * @param {number} charRemained 
 * @returns {string}
 */
export const getCroppedStringIfAddress = (str: string, charRemained: number = 4): string => {
  const isAddress = str.length === 42 && str.slice(0, 2) === '0x'
  if (!isAddress) return str
  const head = str.substring(0, charRemained)
  const tail = str.slice(-1 * charRemained)
  return head + '....' + tail
}

export const copyToClipboard = (valueToCopy: string) => {
  navigator.clipboard.writeText(valueToCopy)
}