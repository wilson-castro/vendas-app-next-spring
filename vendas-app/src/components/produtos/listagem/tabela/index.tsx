import { Produto } from "app/models/produtos";
import { useState } from "react";

interface TabelaProdutosProps {
  produtos: Produto[];
  onEdit: (produto: Produto) => void;
  onDelete: (produto: Produto) => void;
}

export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({ produtos, onDelete, onEdit }) => {
  return (
    <table className="table is-striped is-hoverable">
      <thead>
        <tr>
          <th>Código</th>
          <th>SKU</th>
          <th>Nome</th>
          <th>Preço</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        { produtos?.map( produto => 
          <ProdutoRow
            key={produto.id}
            produto={produto}
            onEdit={onEdit}
            onDelete={onDelete}
          />
          ) }
      </tbody>
    </table>
  )
}

interface ProdutoRowpProps {
  produto: Produto;
  onEdit: (produto: Produto) => void;
  onDelete: (produto: Produto) => void;
}

const ProdutoRow: React.FC<ProdutoRowpProps> = ({
  onEdit,
  onDelete,
  produto
}) => {

  const [deletando, setDeletando ] = useState(false);
  const  { id: codigo, nome, preco, sku} = produto;
  
  const onDeleteClick = (produto: Produto) => {
    if(deletando) onDelete(produto);
    else setDeletando(true);
  };

  return (
    <tr>
      <td>{codigo}</td>
      <td>{sku}</td>
      <td>{nome}</td>
      <td>{preco}</td>
      <td>
        {!deletando &&
          <button onClick={ () => onEdit(produto) } className="button is-success is-rounded is-small">Editar</button>
        }
        <button onClick={ () => onDeleteClick(produto) }className="button is-danger is-rounded is-small">
          { deletando ? "Confirma?" : "Cancelar"}</button>
        {deletando &&
          <button onClick={ () => setDeletando(false) }className="button is-rounded is-small">Cancelar</button>
        }
      </td>
    </tr>
  )
}