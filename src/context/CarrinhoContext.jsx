import { useState } from 'react'
import { CarrinhoContext } from './CarrinhoContext'


export function CarrinhoProvider({ children }) {
    const [carrinho, setCarrinho] = useState([])

    function adicionarAoCarrinho(produto) {
        const produtoJaExiste = carrinho.find(
            item => item.id === produto.id
        )

        if (produtoJaExiste) {
            const novoCarrinho = carrinho.map(item => {
                if (item.id === produto.id) {
                    return {
                        ...item,
                        quantidade: item.quantidade + 1
                    }
                }

                return item
            })

            setCarrinho(novoCarrinho)
        } else {
            const novoProduto = {
                ...produto,
                quantidade: 1
            }

            setCarrinho([...carrinho, novoProduto])
        }
    }

    function removerDoCarrinho(id) {
        const novoCarrinho = carrinho.filter(
            item => item.id !== id
        )

        setCarrinho(novoCarrinho)
    }

    function atualizarQuantidade(id, novaQuantidade) {
        if (novaQuantidade <= 0) {
            removerDoCarrinho(id)
            return
        }

        const novoCarrinho = carrinho.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    quantidade: novaQuantidade
                }
            }

            return item
        })

        setCarrinho(novoCarrinho)
    }

    const quantidadeTotal = carrinho.reduce(
        (total, item) => total + item.quantidade,
        0
    )

    return (
        <CarrinhoContext.Provider
            value={{
                carrinho,
                adicionarAoCarrinho,
                removerDoCarrinho,
                atualizarQuantidade,
                quantidadeTotal
            }}
        >
            {children}
        </CarrinhoContext.Provider>
    )
}
