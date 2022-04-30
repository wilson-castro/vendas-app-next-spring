import { Produto } from "app/models/produtos";
import { useProdutoService } from "app/services";
import { converterEmBigDecimal, formatReal } from "app/util/money";
import { Layout } from "components";
import { Input } from "components";
import { Alert } from "components/common/message";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

interface FormErros {
  sku: string;
  nome: string;
  preco: string;
  descricao: string;
}

export const CadastroProdutos : React.FC = () => {

  const router = useRouter();
  const { id: queryId } : any =  router.query;
  const service = useProdutoService();

  const [sku, setSku] = useState('');
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [messages, setMessages]= useState<Array<Alert>>([]);
  const [descricao, setDescricao] = useState('');
  const [id, setId] = useState<string | undefined>('');
  const [cadastro, setCadastro] = useState<string | undefined>('');
  const [ errors, setErrors ] = useState<Partial<FormErros>>({});

  useEffect( ()=> {
    if(queryId) {
      service.carregarProduto(Number(queryId))
      .then( (produtoEncontrado: Produto) => {
          setId(produtoEncontrado.id);
          setSku(produtoEncontrado.sku ?? '');
          setNome(produtoEncontrado.nome ?? '');
          setPreco( formatReal(`${produtoEncontrado.preco}`) ?? '');
          setDescricao(produtoEncontrado.descricao ?? '');      
          setCadastro(produtoEncontrado.cadastro ?? '' );      
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ queryId ])

  const submit = () => {
    const produto: Produto = {
      id, sku, preco: converterEmBigDecimal(preco), nome, descricao
    }

    validationSchema.validate(produto)
      .then( obj => {
        setErrors({});

        if(id){      
          service.atualizar(produto)
            .then( () =>{             
                setMessages([{
                  tipo: "success", texto: "Produto atualizado com sucesso!",
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
            });
        }
      })
      .catch( (err) => {
        const field =  err.path;
        const message = err.message;

        setErrors({
          [field]: message
        });

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
          error={ errors.sku }
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
          error={ errors.preco }
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
            error={ errors.nome }
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
          {
            errors.descricao && 
            <p className="help is-danger">{ errors.descricao } </p>
          }
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control is-link">
            <button className="button" onClick={submit}>
              { id ? "Atualizar" : "Salvar"} 
            </button>
        </div>
        <div className="control">
          <Link passHref href="/consultas/produtos">
            <button className="button">
                Voltar
            </button>
          </Link>
        </div>
        </div>
    </Layout>
  )
}