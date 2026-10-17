import { useState, useEffect } from 'react'
import { Link, Routes, Route } from 'react-router-dom'

import DetalhesProduto from './pages/DetalhesProduto.jsx'
import Carrinho from './pages/Carrinho.jsx'
import Pagamento from './pages/Pagamento.jsx'
import Sucesso from './pages/Sucesso.jsx'
import Falha from './pages/Falha.jsx'

import './App.css'

function App() {
    const [listaProdutos, setListaProdutos] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')
    const [carrinho, setCarrinho] = useState([])
    const [busca, setBusca] = useState('')

    // Buscar produtos na API
    useEffect(() => {
        async function buscarProdutos() {
            try {
                const resposta = await fetch('http://localhost:3001/produtos')

                if (!resposta.ok) {
                    throw new Error('Erro ao buscar produtos')
                }

                const dados = await resposta.json()
                setListaProdutos(dados)

            } catch (error) {
                console.error('Erro:', error.message)
                setErro('Não foi possível carregar os produtos.')

            } finally {
                setCarregando(false)
            }
        }

        buscarProdutos()
    }, [])

    // Adicionar produto ao carrinho
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

        alert(`Produto ${produto.nome} adicionado ao carrinho!`)
    }

    // Atualizar quantidade
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

    // Remover produto
    function removerDoCarrinho(id) {
        const novoCarrinho = carrinho.filter(
            item => item.id !== id
        )

        setCarrinho(novoCarrinho)
    }

    // Total de itens
    const quantidadeTotal = carrinho.reduce(
        (total, item) => total + item.quantidade,
        0
    )

    // Filtrar produtos pela busca
    const produtosFiltrados = listaProdutos.filter(produto =>
        produto.nome.toLowerCase().includes(busca.toLowerCase())
    )

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <div className="container">
                        <h1>Loja Virtual</h1>

                        <p>
                            Itens no carrinho:
                            <strong> {quantidadeTotal}</strong>
                        </p>

                        <Carrinho
                            itens={carrinho}
                            onRemover={removerDoCarrinho}
                            onAtualizarQuantidade={atualizarQuantidade}
                        />

                        <div className="campo-busca">
                            <input
                                type="text"
                                placeholder="Buscar produtos..."
                                value={busca}
                                onChange={event => setBusca(event.target.value)}
                            />
                        </div>

                        {carregando && <p>Carregando produtos...</p>}

                        {erro && (
                            <p className="mensagem-erro">{erro}</p>
                        )}

                        <div className="produtos-grid">
                            {produtosFiltrados.map(produto => (
                                <div
                                    key={produto.id}
                                    className="produto-card"
                                >
                                    <Link
                                        to={`/produto/${produto.id}`}
                                        className="link-produto"
                                    >
                                        {produto.imagem && (
                                            <img
                                                src={produto.imagem}
                                                alt={produto.nome}
                                            />
                                        )}

                                        <h2>{produto.nome}</h2>
                                    </Link>

                                    <p className="preco">
                                        R$ {produto.preco.toFixed(2)}
                                    </p>

                                    <button
                                        onClick={() => adicionarAoCarrinho(produto)}
                                    >
                                        Adicionar ao carrinho
                                    </button>
                                </div>
                            ))}
                        </div>

                        {!carregando && !erro && produtosFiltrados.length === 0 && (
                            <p>Nenhum produto encontrado.</p>
                        )}
                    </div>
                }
            />

            <Route
                path="/produto/:id"
                element={
                    <DetalhesProduto
                        onAdicionar={adicionarAoCarrinho}
                    />
                }
            />

            <Route
                path="/pagamento"
                element={<Pagamento />}
            />

            <Route
                path="/sucesso"
                element={<Sucesso />}
            />

            <Route
                path="/falha"
                element={<Falha />}
            />
        </Routes>
    )
}

export default App