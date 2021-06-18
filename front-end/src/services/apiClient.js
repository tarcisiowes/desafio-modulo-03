const BASE_URL = 'http://localhost:4000/'
// http://localhost:4000/login
// https://desafio-m03.herokuapp.com/

async function post(resource, data, token) {
  const resposta = await fetch(BASE_URL+resource, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token
  },
  body: JSON.stringify(data),

  })
  
  const dados = await resposta.json()
  
  return {dados, erro: !resposta.ok}
}

async function get(resource) {
  const resposta = await fetch(BASE_URL+resource)
  const dados = await resposta.json()
  return dados
}

async function del(resource, data, token) {
  const resposta = await fetch(BASE_URL+resource, {
    method: 'DELETE',
    Authorization: token
  })

  return resposta.json()
}

async function put(resource, data, token) {
  const resposta = await fetch(BASE_URL+resource, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token
  },
  body: JSON.stringify(data),

  })
  
  const dados = await resposta.json()
  
  return {dados, erro: !resposta.ok}
}
// async function del(resource, data) {
//   const resposta = await fetch(BASE_URL+resource)

//   return resposta.json()
// }

export { post, get, del, put }
