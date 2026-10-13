import { useNavigate } from 'react-router-dom'

function Falha() {

    const navigate = useNavigate()


    function tentarNovamente() {

        navigate(-1)
    }


    function voltarParaLoja() {

        navigate('/')
    }


    return (
        <div className="pagina-falha">

            <h1>❌ Pagamento não aprovado</h1>


            <p>
                Não foi possível concluir o pagamento.
            </p>


            <p>
                Você pode tentar novamente usando
                outra forma de pagamento.
            </p>


            <button onClick={tentarNovamente}>
                Tentar novamente
            </button>


            <button onClick={voltarParaLoja}>
                Voltar para a loja
            </button>

        </div>
    )
}

export default Falha