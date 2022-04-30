import useSWR from "swr";
import Link from "next/link";
import { AxiosResponse } from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";

import { httpClient } from "app/http";

import { Produto } from "app/models/produtos";
import { Layout } from "components/layout";
import { TabelaProdutos } from "./tabela";
import { Loader } from "components/common";
import { useProdutoService } from "app/services";
import { Alert } from "components/common/message";

export const ListagemProdutos: React.FC = () =>{
  const service = useProdutoService();
  const [messages, setMessages] = useState<Array<Alert>>([]);
  const [lista, setLista] = useState<Array<Produto>>([]);
  const { data: result } = useSWR<AxiosResponse<Produto[]>>('/api/produtos', url => httpClient.get(url));

  const editar = (produto: Produto) => {
    const url = `/cadastros/produtos?id=${produto.id}`;
    Router.push(url);
  };

  useEffect( () => {
    setLista(result?.data ?? []);
  }, [result])

  const deletar = (produto: Produto) => {
    service.deletar(produto.id).then( response => {
      setMessages([{ tipo: "success", texto: "Produto excluído com sucesso!"}]);
      const listaAlterada = lista?.filter( p =>  p.id != produto.id);
      setLista(listaAlterada);
    })
  }

  return (
    <Layout titulo="Produtos" mensagens={messages}>
      <Link passHref href="/cadastros/produtos">
        <button className="button is-success">Novo</button>
      </Link>
      <br/>
      <br/>
      <Loader show={!result} />
      <TabelaProdutos onDelete={deletar} onEdit={editar} produtos={lista} />
    </Layout>
  );
}