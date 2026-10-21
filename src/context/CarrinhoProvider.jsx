import { useState, useEffect } from 'react'
import { CarrinhoContext } from './CarrinhoContext'

const CHAVE_CARRINHO = 'loja-virtual:carrinho'

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState(() => {
    try {
      const carrinhoSalvo = localStorage.getItem(CHAVE_CARRINHO)

      return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : []
    } catch (error) {
      console.error('Erro ao carregar o carrinho:', error)
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(
        CHAVE_CARRINHO,
        JSON.stringify(carrinho)
      )
    } catch (error) {
      console.error('Erro ao salvar o carrinho:', error)
    }
  }, [carrinho])

  function adicionarAoCarrinho(produto) {
    const produtoJaExiste = carrinho.find(
      item => item.id === produto.id
    )

    if (produtoJaExiste) {
      setCarrinho(carrinho.map(item =>
        item.id === produto.id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      ))
    } else {
      setCarrinho([
        ...carrinho,
        { ...produto, quantidade: 1 }
      ])
    }
  }

  function removerDoCarrinho(id) {
    setCarrinho(carrinho.filter(item => item.id !== id))
  }

  function atualizarQuantidade(id, novaQuantidade) {
    if (novaQuantidade <= 0) {
      removerDoCarrinho(id)
      return
    }

    setCarrinho(carrinho.map(item =>
      item.id === id
        ? { ...item, quantidade: novaQuantidade }
        : item
    ))
  }

  const quantidadeTotal = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  )

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        setCarrinho,
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