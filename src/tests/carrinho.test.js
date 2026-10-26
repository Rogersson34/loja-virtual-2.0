
import { describe, it, expect } from 'vitest'

import {
    calcularTotalCarrinho,
    calcularQuantidadeTotal
} from '../utils/carrinho.js'

describe('Cálculos do carrinho', () => {
    it('deve calcular o valor total dos produtos', () => {
        const carrinho = [
            { preco: 100, quantidade: 2 },
            { preco: 50, quantidade: 1 }
        ]

        expect(calcularTotalCarrinho(carrinho)).toBe(250)
    })

    it('deve retornar zero quando o carrinho estiver vazio', () => {
        expect(calcularTotalCarrinho([])).toBe(0)
    })

    it('deve calcular a quantidade total de produtos', () => {
        const carrinho = [
            { preco: 100, quantidade: 2 },
            { preco: 50, quantidade: 3 }
        ]

        expect(calcularQuantidadeTotal(carrinho)).toBe(5)
    })

    it('deve retornar zero quando não houver produtos', () => {
        expect(calcularQuantidadeTotal([])).toBe(0)
    })
})
