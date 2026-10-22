import { useCarrinho } from '../hooks/useCarrinho.js'

function ItemCarrinho({ item }) {
    const {
        removerDoCarrinho,
        atualizarQuantidade
    } = useCarrinho()

    return (
        <div className="item-carrinho">

            <div className="info-produto">
                <h3>{item.nome}</h3>

                <p>
                    Preço: R$ {Number(item.preco).toFixed(2)}
                </p>
            </div>

            <div className="controle-quantidade">

                <button
                    onClick={() =>
                        atualizarQuantidade(
                            item.id,
                            item.quantidade - 1
                        )
                    }
                >
                    -
                </button>

                <span>{item.quantidade}</span>

                <button
                    onClick={() =>
                        atualizarQuantidade(
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
                    Subtotal: R$ {
                        (Number(item.preco) * item.quantidade).toFixed(2)
                    }
                </p>
            </div>

            <button
                onClick={() => removerDoCarrinho(item.id)}
            >
                🗑️ Remover
            </button>

        </div>
    )
}

export default ItemCarrinho