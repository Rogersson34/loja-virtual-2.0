
import ItemCarrinho from '../components/ItemCarrinho.jsx'
import ResumoCompra from '../components/ResumoCompra.jsx'
import { useCarrinho } from '../hooks/useCarrinho.js'

function Carrinho() {
    const {
        carrinho,
        removerDoCarrinho,
        atualizarQuantidade
    } = useCarrinho()

    // Soma o valor de todos os produtos
    const total = carrinho.reduce((soma, item) => {
        return soma + (Number(item.preco) * item.quantidade)
    }, 0)

    return (
        <div className="pagina-carrinho">

            <h1>🛍️ Carrinho de Compras</h1>

            {carrinho.length === 0 ? (

                <p>Seu carrinho está vazio.</p>

            ) : (

                <div>

                    {carrinho.map((item) => (
                        <ItemCarrinho
                            key={item.id}
                            item={item}
                            onRemover={removerDoCarrinho}
                            onAtualizarQuantidade={atualizarQuantidade}
                        />
                    ))}

                    <div className="total-carrinho">

                        <h2>
                            Total: R$ {total.toFixed(2)}
                        </h2>

                    </div>

                </div>
            )}

            <ResumoCompra itens={carrinho} />

        </div>
    )
}

export default Carrinho
