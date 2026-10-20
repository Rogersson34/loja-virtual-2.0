
import { useNavigate } from 'react-router-dom'
import { useCarrinho } from '../hooks/useCarrinho.js'

function ResumoCompra() {
    const navigate = useNavigate()

    const { carrinho, quantidadeTotal } = useCarrinho()

    const valorTotal = carrinho.reduce(
        (total, item) => {
            return total + (Number(item.preco) * item.quantidade)
        },
        0
    )

    function irParaPagamento() {
        navigate('/pagamento', {
            state: {
                total: valorTotal
            }
        })
    }

    return (
        <div className="resumo-compra">

            <h2>Resumo da Compra</h2>

            <p>
                Quantidade de produtos:
                <strong> {quantidadeTotal}</strong>
            </p>

            <p>
                Total:
                <strong> R$ {valorTotal.toFixed(2)}</strong>
            </p>

            <button
                onClick={irParaPagamento}
                disabled={carrinho.length === 0}
            >
                Finalizar compra
            </button>

        </div>
    )
}

export default ResumoCompra
