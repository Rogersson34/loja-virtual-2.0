import { useLocation, useNavigate } from 'react-router-dom'

function Sucesso() {

    const location = useLocation()
    const navigate = useNavigate()

    const total = location.state?.total || 0

    const formaPagamento =
        location.state?.formaPagamento || 'Não informado'


    function voltarParaLoja() {
        navigate('/')
    }


    return (
        <div className="pagina-sucesso">

            <h1>✅ Compra aprovada!</h1>

            <p>
                Sua compra foi aprovada.
            </p>

            <p>
                Forma de pagamento:
                <strong> {formaPagamento}</strong>
            </p>

            <p>
                Valor pago:
                <strong> R$ {total.toFixed(2)}</strong>
            </p>

            <button onClick={voltarParaLoja}>
                Voltar para a loja
            </button>

        </div>
    )
}

export default Sucesso