
import { useCarrinho } from '../hooks/useCarrinho.js'

function ItemCarrinho({ item }) {
    const {
        removerDoCarrinho,
        atualizarQuantidade
    } = useCarrinho()

    const estoque = Number(item.estoque) || 0

    return (
        <div className="item-carrinho">
            <div className="info-produto">
                <h3>{item.nome}</h3>

                <p>
                    Preço: {Number(item.preco).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })}
                </p>

                <p>Estoque disponível: {estoque}</p>
            </div>

            <div className="controle-quantidade">
                <button
                    onClick={() =>
                        atualizarQuantidade(item.id, item.quantidade - 1)
                    }
                    disabled={item.quantidade <= 1}
                    aria-label={`Diminuir quantidade de ${item.nome}`}
                >
                    -
                </button>

                <span>{item.quantidade}</span>

                <button
                    onClick={() =>
                        atualizarQuantidade(item.id, item.quantidade + 1)
                    }
                    disabled={item.quantidade >= estoque}
                    aria-label={`Aumentar quantidade de ${item.nome}`}
                >
                    +
                </button>
            </div>

            <div className="subtotal-item">
                <p>
                    Subtotal: {(Number(item.preco) * item.quantidade)
                        .toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        })}
                </p>
            </div>

            <button onClick={() => removerDoCarrinho(item.id)}>
                🗑️ Remover
            </button>
        </div>
    )
}

export default ItemCarrinho
