import { httpClient } from "app/http";
import { Produto } from "app/models/produtos";
import { AxiosResponse } from "axios";

const resourceURL: string = "/api/produtos";

export const useProdutoService = () => {
  const salvar = async (produto: Produto): Promise<Produto> => {
    const response: AxiosResponse<Produto> = await httpClient.post<Produto>(
      resourceURL,
      produto
    );
    return response.data;
  };

  const atualizar = async (produto: Produto): Promise<void> => {
    await httpClient.put<Produto>(`${resourceURL}/${produto.id}`, produto);
  };

  const carregarProduto = async (id: number): Promise<Produto> => {
    const url: string = `${resourceURL}/${id}`;
    const response: AxiosResponse<Produto> = await httpClient.get(url);
    return response.data;
  };

  const deletar = async (id: any): Promise<void> => {
    const url: string = `${resourceURL}/${id}`;
    await httpClient.delete(url);
  };

  return {
    salvar,
    deletar,
    atualizar,
    carregarProduto,
  };
};
