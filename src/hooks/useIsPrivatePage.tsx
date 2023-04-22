import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAccount } from 'wagmi'

const useIsPrivatePage = (isPrivatePage: boolean) => {
  const { address } = useAccount()
  const navigate = useNavigate()
  useEffect(() => {
    if (isPrivatePage) {
      if (!address) navigate('/')
    } else {
      if (address) navigate('/pools')
    }
  }, [address])
}

export default useIsPrivatePage