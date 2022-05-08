import * as Yup from 'yup';

const campoObrigatórioMensagem = "Campo Obrigatório";
const campoObrigatorioValidation = Yup.string().trim().required(campoObrigatórioMensagem);

export const validationScheme = Yup.object().shape({
  cpf: campoObrigatorioValidation.length(14, "CPF inválido"),
  dataNascimento: campoObrigatorioValidation.length(10, "Data inválida"),
  email: campoObrigatorioValidation.email("Email inválido"),
  endereco:campoObrigatorioValidation,
  nome: campoObrigatorioValidation,
  telefone: campoObrigatorioValidation
})