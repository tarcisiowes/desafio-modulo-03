import './style.js'

function ProdutosEdit() {
  return (
    <div>
      Put
        Funcionalidades obrigatórias:
        Como a atualização dos dados do produto pode ser parcial (somente um campo por ex), não é obrigatório carregar os dados do produto nesta tela e nem verificar os dados obrigatórios.
        Enviar os dados do formulário para a rota PUT /produtos/:id
        Redirecionar para a rota de produtos (/produtos);
        Inputs:
        nome
        preco
        estoque
        descricao
        imagem (link para uma imagem)
      
    </div>
  );
}

export default ProdutosEdit
