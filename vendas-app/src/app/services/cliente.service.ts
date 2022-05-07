import { httpClient } from "app/http";
import { Cliente } from "app/models/clientes"; 
import { AxiosResponse } from "axios";

const resourceURL: string = "/api/clientes";

export const useClienteService = () => {

  const salvar = async (cliente: Cliente) : Promise<Cliente> => {
    const response: AxiosResponse<Cliente> = await httpClient.post<Cliente>(resourceURL, cliente);
    return response.data;
  }

  const atualizar = async (cliente: Cliente): Promise<void> => {
    await httpClient.put<Cliente>(`${resourceURL}/${cliente.id}`, cliente);
  };

  const carregarCliente = async (id: number): Promise<Cliente> => {
    const url: string = `${resourceURL}/${id}`;
    const response: AxiosResponse<Cliente> = await httpClient.get(url);
    return response.data;
  };

  const deletar = async (id: any): Promise<void> => {
    const url: string = `${resourceURL}/${id}`;
    await httpClient.delete(url);
  };


  return {
    salvar,
    atualizar,
    carregarCliente,
    deletar
  }
}