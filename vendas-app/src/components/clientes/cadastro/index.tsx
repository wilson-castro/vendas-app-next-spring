import { useState } from "react";
import { ClienteForm } from "./form";
import { Layout } from "components/layout";
import { Cliente } from "app/models/clientes";
import { Alert } from "components/common/message";
import { useClienteService } from "app/services";

export const CadastroCliente: React.FC = () => {

const service = useClienteService();

const [messages, setMessages]= useState<Array<Alert>>([]);
const [cliente, setCliente] = useState<Cliente>({});

const handleSubmit = (cliente: Cliente) => {
  if(cliente.id){
    service.atualizar(cliente)
      .then( response => {
        setMessages([{
          tipo: 'success', texto: "Cliente atualizado com sucesso!"
        }])
      })
  } else {
    service.salvar(cliente)
      .then( clienteSalvo => {
        setCliente(clienteSalvo);
        setMessages([{
          tipo: 'success', texto: "Cliente cadastrado com sucesso!"
        }])
      })
  }
}

  return (
    <Layout titulo="Clientes" mensagens={messages}>
      <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
    </Layout >
  )
}