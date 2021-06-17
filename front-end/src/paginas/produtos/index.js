import './style.js'

function Produtos() {
  return (
    <div>
      GET
      Carregamento dos produtos da loja (GET /produtos)
      Ao clicar no card do produto, redirecionar para a rota de (/produto/:id/editar)
      Ao clicar no icone de lixo no card do produto, abrir um modal e se o cliente confirmar, deletar o produto (DELETE /produtos/:id)
      Ao clicar no botão de "ADICIONAR PRODUTO", redirecionar para a rota de (/produtos/novo)


    </div>
  );
}

export default Produtos
