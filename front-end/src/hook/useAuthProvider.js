  
import { useState } from 'react'


export default function useAuthProvider() {

  const [token, setToken] = useState(null)

  const logar = (token) => {

    setToken(`Bearer ${token}`)
  }

  const deslogar = () => {

    setToken(null)
  }
 
  return {

    token,
    logar,
    deslogar,
  }
}
