import { useState } from 'react'

function usePagamento() {

    const [carregando, setCarregando] = useState(false)


    async function processarPagamento(
        formaPagamento,
        numeroCartao
    ) {

        setCarregando(true)

        await new Promise((resolve) => {
            setTimeout(resolve, 2000)
        })

        if (formaPagamento !== 'Cartão de Crédito') {

            setCarregando(false)

            return true
        }

        const numeroLimpo =
            numeroCartao.replace(/[\s-]/g, '')

        const todosIguais = numeroLimpo
            .split('')
            .every(
                digito => digito === numeroLimpo[0]
            )

        setCarregando(false)

        return !todosIguais
    }


    return {
        processarPagamento,
        carregando
    }
}

export default usePagamento

