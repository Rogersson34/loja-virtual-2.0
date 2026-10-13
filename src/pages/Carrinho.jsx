import ItemCarrinho from '../components/ItemCarrinho.jsx'
import ResumoCompra from '../components/ResumoCompra.jsx'

function Carrinho({ itens, onRemover, onAtualizarQuantidade }) {

    // Soma o valor de todos os produtos
    const total = itens.reduce((soma, item) => {
        return soma + (item.preco * item.quantidade)
    }, 0)

    return (
        <div className="pagina-carrinho">

            <h1>🛍️ Carrinho de Compras</h1>

            {itens.length === 0 ? (

                <p>Seu carrinho está vazio.</p>

            ) : (

                <div>

                    {itens.map((item) => (
                        <ItemCarrinho
                            key={item.id}
                            item={item}
                            onRemover={onRemover}
                            onAtualizarQuantidade={onAtualizarQuantidade}
                        />
                    ))}

                    <div className="total-carrinho">

                        <h2>
                            Total: R$ {total.toFixed(2)}
                        </h2>

                    </div>

                </div>
            )}

            <ResumoCompra itens={itens} />
        </div>
    )
}

export default Carrinho