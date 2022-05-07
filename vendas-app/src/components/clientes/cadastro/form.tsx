import { Cliente }  from 'app/models/clientes';
import { Input, InputCPF, InputTelefone, InputDate } from 'components';
import { useFormik } from 'formik';


interface ClienteFormProps {
  cliente: Cliente;
  onSubmit: (cliente:Cliente) => void;
}

const formScheme : Cliente = {
  cadastro: '',
  cpf: '',
  dataNascimento: '',
  email: '',
  endereco: '',
  id: '',
  nome: '',
  telefone: '',
}

export const ClienteForm: React.FC<ClienteFormProps> = ({
  cliente,
  onSubmit
}) => {

  const formik = useFormik<Cliente>({
    initialValues: {...formScheme,...cliente },
    onSubmit,
    enableReinitialize: true
  });

  const caixaAlta = (value: string) => {
    return value.toLocaleUpperCase();
  }

  return (
    <form action="" onSubmit={formik.handleSubmit}>
      {formik.values.id && (
        <div className="columns">
        <Input
          id="id"
          disabled
          name="id"
          label="Código: *"
          autoComplete="off"
          columnClasses="is-half"
          value={formik.values.id}
        />
        <Input
          disabled
          id="cadastro"
          name="cadastro"
          autoComplete="off"
          columnClasses="is-half"
          label="Data Cadastro: *"
          value={formik.values.cadastro}
        />
      </div>
      )}
      
      <div className="columns">
        <Input
          id="nome"
          name="nome"
          label="Nome: *"
          autoComplete="off"
          formatter={caixaAlta}
          columnClasses="is-full"
          value={formik.values.nome}
          onChange={formik.handleChange} 
        />
      </div>
      <div className="columns">
        <InputCPF
          id="cpf"
          name="cpf"
          label="CPF: *"
          autoComplete="off"
          columnClasses="is-half"
          value={formik.values.cpf}
          onChange={formik.handleChange} 
        />
        <InputDate
          id="dataNascimento"
          name="dataNascimento"
          label="Data Nascimento: *"
          autoComplete="off"
          columnClasses="is-half"
          value={formik.values.dataNascimento}
          onChange={formik.handleChange} 
        />
      </div>
      <div className="columns">
        <Input
            id="endereco"
            name="endereco"
            label="Endereço: *"
            autoComplete="off"
            columnClasses="is-full"
            value={formik.values.endereco}
            onChange={formik.handleChange} 
          />
      </div>
      <div className="columns">
        <Input
          id="email"
          name="email"
          label="Email: *"
          autoComplete="off"
          columnClasses="is-half"
          value={formik.values.email}
          onChange={formik.handleChange} 
        />
        <InputTelefone
          id="telefone"
          name="telefone"
          label="Telefone: *"
          autoComplete="off"
          columnClasses="is-half"
          value={formik.values.telefone}
          onChange={formik.handleChange} 
        />
      </div>
      <div className="field is-grouped">
        <div className="control is-link">
          <button className="button" type="submit">
            { formik.values.id ? "Atualizar" : "Salvar" }
          </button> 
        </div>
      </div>
    </form>
  )
}