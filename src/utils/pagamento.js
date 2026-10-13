function validarCartao(titular, numeroCartao, validade, cvv) {

    const numeroLimpo = numeroCartao.replace(/[\s-]/g, '')

    if (titular.trim() === '') {
        return 'Preencha o nome do titular.'
    }

    if (!/^\d{16}$/.test(numeroLimpo)) {
        return 'O número do cartão deve conter 16 dígitos.'
    }

    if (!/^\d{2}\/\d{2}$/.test(validade)) {
        return 'A validade deve estar no formato MM/AA.'
    }

    const mes = Number(validade.split('/')[0])

    if (mes < 1 || mes > 12) {
        return 'O mês deve estar entre 01 e 12.'
    }

    if (!/^\d{3}$/.test(cvv)) {
        return 'O CVV deve conter 3 dígitos.'
    }

    return null
}

export default validarCartao

