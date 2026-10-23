import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import usePagamento from '../hooks/usePagamento.js'
import validarCartao from '../utils/pagamento.js'
import { useCarrinho } from '../hooks/useCarrinho.js'

function Pagamento() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const { processarPagamento, carregando } = usePagamento()
    const { carrinho, setCarrinho } = useCarrinho()

    const total = carrinho.reduce(
        (soma, item) => soma + Number(item.preco) * item.quantidade,
        0
    )

    const [formaPagamento, setFormaPagamento] = useState('')
    const [erro, setErro] = useState('')

    console.log(state)

    const [cartao, setCartao] = useState({
        titular: '',
        numero: '',
        validade: '',
        cvv: ''
    })

    function preencherCartao(event) {
        const { name, value } = event.target

        setCartao({
            ...cartao,
            [name]: value
        })
    }

    async function finalizarPagamento(event) {
        event.preventDefault()
        setErro('')

        if (!formaPagamento) {
            setErro('Escolha uma forma de pagamento.')
            return
        }

        if (formaPagamento === 'Cartão de Crédito') {
            const erroCartao = validarCartao(
                cartao.titular,
                cartao.numero,
                cartao.validade,
                cartao.cvv
            )

            if (erroCartao) {
                setErro(erroCartao)
                return
            }
        }

        const aprovado = await processarPagamento(
            formaPagamento,
            cartao.numero
        )

        if (aprovado) {
            setCarrinho([])

            navigate('/sucesso', {
                state: { total, formaPagamento }
            })
        } else {
            navigate('/falha')
        }
    }

    const formas = ['Pix', 'Cartão de Crédito', 'Boleto']

    if (carrinho.length === 0) {
        return (
            <div className="pagina-pagamento">
                <h1>Seu carrinho está vazio</h1>

                <p>
                    Adicione produtos antes de realizar o pagamento.
                </p>

                <button onClick={() => navigate('/')}>
                    Voltar para a loja
                </button>
            </div>
        )
    }

    return (
        <div className="pagina-pagamento">
            <h1>💳 Pagamento</h1>

            <p>
                Total da compra:
                <strong> R$ {total.toFixed(2)}</strong>
            </p>

            <form onSubmit={finalizarPagamento}>
                <h2>Escolha a forma de pagamento</h2>

                {formas.map((forma) => (
                    <label key={forma}>
                        <input
                            type="radio"
                            name="pagamento"
                            value={forma}
                            checked={formaPagamento === forma}
                            onChange={(event) =>
                                setFormaPagamento(event.target.value)
                            }
                        />
                        {forma}
                    </label>
                ))}

                {formaPagamento === 'Cartão de Crédito' && (
                    <div className="dados-cartao">
                        <h2>Dados do cartão</h2>

                        {[
                            ['titular', 'Nome do titular'],
                            ['numero', '1234 5678 1234 5678'],
                            ['validade', 'MM/AA'],
                            ['cvv', 'CVV']
                        ].map(([name, placeholder]) => (
                            <input
                                key={name}
                                name={name}
                                placeholder={placeholder}
                                value={cartao[name]}
                                onChange={preencherCartao}
                            />
                        ))}
                    </div>
                )}

                {erro && (
                    <p className="mensagem-erro">{erro}</p>
                )}

                <button type="submit" disabled={carregando}>
                    {carregando
                        ? 'Processando compra…'
                        : 'Finalizar pagamento'}
                </button>
            </form>
        </div>
    )
}

export default Pagamento
