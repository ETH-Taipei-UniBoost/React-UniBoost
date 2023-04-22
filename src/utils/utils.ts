import dateFormat from 'dateformat'
import { BigNumber, ethers } from 'ethers'
import BigNumberJS from "bignumber.js"

export const BN = (str: string) => BigNumber.from(str)
const BNJS = (n: string | number) => new BigNumberJS(n)
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

export const formatDate = (timestamp: string) => dateFormat(new Date(Number(timestamp) * 1000), 'yyyy-mm-dd')


/**
 * str should be string type and look like a number. e.g. '123.456
 * '123456.456' , 2  ->  '123456.46'
 * '123456.456' , -3  ->  '123.46'
 * '0.0001' , 2  ->  '>0.005'
 */
export const roundString = (str: string, to: number) => {
  if (str === '- -') return str
  try {
    const BN = BNJS(str)
    const resolution = BNJS(5).dividedBy(BNJS(10).pow(to + 1))
    const minDisplayedValue = BNJS(1).dividedBy(BNJS(10).pow(to))
    if (!BN.eq(0) && BN.lt(resolution)) return `< ${minDisplayedValue.toString()}`
    if (to >= 0) return BN.toFixed(to)
    return BN.dividedBy(10 ** -to).toFixed(2)
  } catch (e) {
    console.log(e)
    return '- -'
  }
}

export const sendTxAndWait = async (contract: ethers.Contract, functionName: string, args: any[]) => {
  await contract.callStatic[functionName].apply(null, args)

  const Tx: ethers.ContractTransaction = await contract[functionName].apply(null, args)
  console.log('Tx: ', Tx)

  const Receipt: ethers.ContractReceipt = await Tx.wait()
  console.log('Receipt: ', Receipt)
}
