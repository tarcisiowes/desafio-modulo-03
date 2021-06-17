import './style.js'

function PerfilEdit() {
  return (
    <div>
      Como a atualização dos dados do perfil pode ser parcial (somente um campo por ex), não é obrigatório carregar os dados do usuário nesta tela e nem verificar os dados obrigatórios.
      Se a senha for informada, validar a igualdade das senhas
      Enviar os dados do formulário para a rota PUT /perfil
      Redirecionar para a rota de perfil (/perfil);
      Inputs:
      nome
      nome_loja
      email
      senha
      senhaConfirmacao
    </div>
  );
}

export default PerfilEdit
