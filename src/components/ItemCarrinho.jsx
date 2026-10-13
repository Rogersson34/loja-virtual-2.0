
function ItemCarrinho({ item, onRemover, onAtualizarQuantidade }) {

    return (
        <div className="item-carrinho">

            <div className="info-produto">
                <h3>{item.nome}</h3>

                <p>
                    Preço: R$ {item.preco.toFixed(2)}
                </p>
            </div>


            <div className="controle-quantidade">

                <button
                    onClick={() =>
                        onAtualizarQuantidade(
                            item.id,
                            item.quantidade - 1
                        )
                    }
                >
                    -
                </button>


                <span>
                    {item.quantidade}
                </span>


                <button
                    onClick={() =>
                        onAtualizarQuantidade(
                            item.id,
                            item.quantidade + 1
                        )
                    }
                >
                    +
                </button>

            </div>


            <div className="subtotal-item">

                <p>
                    Subtotal: R$ {(item.preco * item.quantidade).toFixed(2)}
                </p>

            </div>


            <button
                onClick={() => onRemover(item.id)}
            >
                🗑️ Remover
            </button>

        </div>
    )
}

export default ItemCarrinho
