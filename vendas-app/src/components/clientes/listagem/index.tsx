import { Input, InputCPF } from "components/common";
import { Layout } from "components/layout";
import { useFormik } from "formik";
import { initScriptLoader } from "next/script";

interface ConsultaClientesForm {
  nome?: string;
  cpf?: string;
}

export const ListagemClientes: React.FC = () => {
  
  const handleSubmit = (filtro: ConsultaClientesForm) => {
    console.log(filtro);
    
  }

  const { handleSubmit: formikSubmit, values: filtro, handleChange } = useFormik<ConsultaClientesForm>({
    onSubmit: handleSubmit,
    initialValues: {nome: '', cpf: ''}
  })
  
  return (
    <Layout titulo="Clientes">
      <form onSubmit={formikSubmit} >

        <div className="columns">
          <Input
            id="nome"
            name="nome"
            label="Nome"
            autoComplete="off"
            value={filtro.nome}
            onChange={handleChange}
            columnClasses="is-half"
          />
          <InputCPF
            id="cpf"
            name="cpf"
            label="CPf"
            autoComplete="off"
            value={filtro.cpf}
            onChange={handleChange}
            columnClasses="is-half"
          />
        </div>

        <div className="field is-grouped">
          <div className="control is-link">
            <button type="submit" className="button is-info" >
              Consultar
            </button>
          </div>
        </div>

      </form>
    </Layout>
  )
}