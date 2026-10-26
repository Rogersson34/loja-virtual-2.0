
import ItemCarrinho from '../components/ItemCarrinho.jsx'
import ResumoCompra from '../components/ResumoCompra.jsx'
import { useCarrinho } from '../hooks/useCarrinho.js'
import { calcularTotalCarrinho } from '../utils/carrinho.js'

function Carrinho() {
    const {
        carrinho,
    } = useCarrinho()

    const total = calcularTotalCarrinho(carrinho)

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

                        />
                    ))}

                    <div className="total-carrinho">

                        <h2>
                            Total: {total.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            })}
                        </h2>

                    </div>

                </div>
            )}

            <ResumoCompra />

        </div>
    )
}

export default Carrinho
