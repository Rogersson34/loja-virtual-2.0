
import { describe, it, expect } from 'vitest'
import validarCartao from '../utils/pagamento.js'

describe('Validação do cartão', () => {
    it('deve aceitar um cartão com dados válidos', () => {
        expect(
            validarCartao(
                'João da Silva',
                '1234 5678 1234 5678',
                '12/28',
                '123'
            )
        ).toBeNull()
    })

    it('deve rejeitar um titular vazio', () => {
        expect(
            validarCartao(
                '   ',
                '1234567812345678',
                '12/28',
                '123'
            )
        ).toBe('Preencha o nome do titular.')
    })

    it('deve rejeitar um número de cartão inválido', () => {
        expect(
            validarCartao(
                'João da Silva',
                '123456',
                '12/28',
                '123'
            )
        ).toBe('O número do cartão deve conter 16 dígitos.')
    })

    it('deve rejeitar um mês inválido', () => {
        expect(
            validarCartao(
                'João da Silva',
                '1234567812345678',
                '13/28',
                '123'
            )
        ).toBe('O mês deve estar entre 01 e 12.')
    })

    it('deve rejeitar um CVV inválido', () => {
        expect(
            validarCartao(
                'João da Silva',
                '1234567812345678',
                '12/28',
                '12'
            )
        ).toBe('O CVV deve conter 3 dígitos.')
    })
})
