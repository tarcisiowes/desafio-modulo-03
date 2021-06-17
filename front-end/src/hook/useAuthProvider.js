  
import { useState } from 'react'

// import { useLocalStorage } from 'react-use'

export default function useAuthProvider() {

  // const [tokenPersistido, setTokenPersistido, removeTokenPersistido] = useLocalStorage('TOKEN', null)

  const [token, setToken] = useState(null)

  const logar = (token) => {

    setToken(`Bearer ${token}`)
    // setTokenPersistido(token)
  }

  const deslogar = () => {

    setToken(null)
    // removeTokenPersistido()
  }
 
  return {

    token,
    logar,
    deslogar,
  }
}
