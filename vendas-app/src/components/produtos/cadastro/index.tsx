import { Produto } from "app/models/produtos";
import { useProdutoService } from "app/services";
import { converterEmBigDecimal } from "app/util/money";
import { Layout } from "components";
import { Input } from "components";
import { Alert } from "components/common/message";
import { useState } from "react";
import * as yup from "yup";

const msgCampoObrigatorio = "Campo obrigatório";

const validationSchema = yup.object().shape({
  sku: yup.string().trim().required(msgCampoObrigatorio),
  nome: yup.string().trim().required(msgCampoObrigatorio),
  descricao: yup.string().trim()
    .required(msgCampoObrigatorio),
  preco: yup.number().required(msgCampoObrigatorio)
    .moreThan(0, "Valor maior que 0,00(zero)"),
})

export const CadastroProdutos : React.FC = () => {

  const service = useProdutoService();
  const [sku, setSku] = useState('');
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
 const [messages, setMessages]= useState<Array<Alert>>([]);
  const [descricao, setDescricao] = useState('');
  const [id, setId] = useState<string | undefined>('');
  const [cadastro, setCadastro] = useState<string | undefined>('');
 
  const submit = () => {
    const produto: Produto = {
      id, sku, preco: converterEmBigDecimal(preco), nome, descricao
    }

    validationSchema.validate(produto)
      .then( obj => {
        if(id){      
          service.atualizar(produto)
            .then( () =>{             
                setMessages([{
                  tipo: "success", texto: "Produto atualizado com sucesso!",
                }])
              }
            ).catch( (response ) => {
              setMessages([{
                tipo: "danger", texto: "Houve um erro no servidor!",
              }])
            });
        }
        else{
          service.salvar(produto)
            .then( produtosResposta => {
              setId(produtosResposta?.id);
              setCadastro(produtosResposta?.cadastro);
              setMessages([{
                tipo: "success", texto: "Produto salvo com sucesso!"
              }])
            }).catch( (response ) => {
              setMessages([{
                tipo: "danger", texto: "Houve um erro no servidor!",
              }])
            });
        }
      })
      .catch( (err) => {
        const field =  err.path;
        const message = err.message;
        setMessages([{
          tipo: "warning",field, texto: message,
        }])
      });

  };

  return (
    <Layout titulo="Cadastro de Produtos" mensagens={messages}>
      {
        id &&
          <div className="columns">
            <Input
              disabled
              value={id}
              label="Código"
              id="inputCodigo"
              columnClasses="is-half"
            />
    
            <Input
              disabled
              value={cadastro}
              id="inputCadastro"
              label="Data Cadastro: "
              columnClasses="is-half"
            />
          </div>
      }

      <div className="columns">
        <Input
          value={sku}
          id="inputSku"
          label="SKU: *"
          onChange={setSku}
          columnClasses="is-half"
          placeholder="Digite o SKU do produto"
        />

        <Input
          currency
          value={preco}
          maxLength={16}
          id="inputPreco"
          label="Preço: *"
          onChange={setPreco}
          columnClasses="is-half"
          placeholder="Digite o Preço do produto"
        />
      </div>

      <div className="columns">
        <Input
            value={nome}
            id="inputNome"
            label="Nome: *"
            onChange={setNome}
            columnClasses="is-full"
            placeholder="Digite o Nome do produto"
          />
      </div>

      <div className="columns">
        <div className="field column is-full">
          <label className="label" htmlFor="inputDesc">Descrição: *</label>
          <textarea className="textarea" id="inputDesc"
            value={descricao} placeholder="Digite a Descrição detalhada do produto"
            onChange={ event => setDescricao(event.target.value)}
          />
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control is-link">
            <button className="button" onClick={submit}>
              { id ? "Atualizar" : "Salvar"} 
            </button>
        </div>
        <div className="control">
            <button className="button">
              Voltar
            </button>
        </div>
        </div>
    </Layout>
  )
}