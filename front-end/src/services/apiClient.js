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

  return resposta.json()
}

async function get(resource) {
  const resposta = await fetch(BASE_URL+resource)

  return resposta.json()
}

async function del(resource, data) {
  const resposta = await fetch(BASE_URL+resource, {
  method: 'DELETE',
  })

  return resposta.json()
}

export { post, get, del }
