import { calcularTotalCarrinho } from '../utils/carrinho.js'
import { useNavigate } from 'react-router-dom'
import { useCarrinho } from '../hooks/useCarrinho.js'

function ResumoCompra() {
    const navigate = useNavigate()

    const { carrinho, quantidadeTotal } = useCarrinho()

    const valorTotal = calcularTotalCarrinho(carrinho)

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
                Total: <strong>
                    {valorTotal.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })}
                </strong>
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
