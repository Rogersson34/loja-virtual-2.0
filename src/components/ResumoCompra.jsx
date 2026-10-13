import { useNavigate } from 'react-router-dom'
function ResumoCompra({ itens }) {

    const navigate = useNavigate()

    const quantidadeTotal = itens.reduce(
        (total, item) => total + item.quantidade,
        0
    )

    const valorTotal = itens.reduce(
        (total, item) => {
            return total + (item.preco * item.quantidade)
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

            <button onClick={irParaPagamento}>Finalizar compra</button>

        </div>
    )
}

export default ResumoCompra

