
import { useState, useEffect, useMemo } from 'react'
import { Link, Routes, Route, Navigate, Outlet } from 'react-router-dom'

import { useCarrinho } from './hooks/useCarrinho'

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

import DetalhesProduto from './pages/DetalhesProduto.jsx'
import Carrinho from './pages/Carrinho.jsx'
import Pagamento from './pages/Pagamento.jsx'
import Sucesso from './pages/Sucesso.jsx'
import Falha from './pages/Falha.jsx'

import './App.css'

// Estrutura compartilhada pelas páginas
function Layout() {
    return (
        <>
            <Header />

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    )
}

// Página do catálogo
function Produtos() {
    const [listaProdutos, setListaProdutos] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')
    const [busca, setBusca] = useState('')

    const { adicionarAoCarrinho } = useCarrinho()

    useEffect(() => {
        async function buscarProdutos() {
            try {
                const resposta = await fetch(
                    'http://localhost:3001/produtos'
                )

                if (!resposta.ok) {
                    throw new Error('Erro ao buscar produtos')
                }

                const dados = await resposta.json()
                setListaProdutos(dados)
            } catch (error) {
                console.error('Erro ao buscar produtos:', error)
                setErro('Não foi possível carregar os produtos.')
            } finally {
                setCarregando(false)
            }
        }

        buscarProdutos()
    }, [])

    function adicionarProduto(produto) {
        adicionarAoCarrinho(produto)
        alert(`Produto ${produto.nome} adicionado ao carrinho!`)
    }

    const produtosFiltrados = useMemo(() => {
        return listaProdutos.filter(produto =>
            produto.nome.toLowerCase().includes(busca.toLowerCase())
        )
    }, [listaProdutos, busca])

    return (
        <div className="container">
            <h1>Loja Virtual</h1>


            <div className="campo-busca">
                <input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={busca}
                    onChange={event => setBusca(event.target.value)}
                />

                {busca && (
                    <button onClick={() => setBusca('')}>
                        Limpar busca
                    </button>
                )}
            </div>


            {carregando && <p>Carregando produtos...</p>}

            {erro && (
                <p className="mensagem-erro">{erro}</p>
            )}

            {!carregando && !erro && listaProdutos.length === 0 && (
                <p>Nenhum produto cadastrado.</p>
            )}

            <div className="produtos-grid">
                {produtosFiltrados.map(produto => (
                    <div key={produto.id} className="produto-card">
                        <Link
                            to={`/produtos/${produto.id}`}
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
                            R$ {Number(produto.preco).toFixed(2)}
                        </p>

                        <button
                            onClick={() => adicionarProduto(produto)}
                        >
                            Adicionar ao carrinho
                        </button>
                    </div>
                ))}
            </div>

            {!carregando &&
                !erro &&
                listaProdutos.length > 0 &&
                produtosFiltrados.length === 0 && (
                    <p>Nenhum produto encontrado.</p>
                )}
        </div>
    )
}

// Página não encontrada
function PaginaNaoEncontrada() {
    return (
        <div className="container">
            <h1>Página não encontrada</h1>
            <p>Não encontramos a página que você está procurando.</p>
            <Link to="/produtos">Voltar para os produtos</Link>
        </div>
    )
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/produtos" replace />} />

            <Route element={<Layout />}>
                <Route path="/produtos" element={<Produtos />} />

                <Route
                    path="/produtos/:id"
                    element={<DetalhesProduto />}
                />

                <Route path="/carrinho" element={<Carrinho />} />

                <Route path="/pagamento" element={<Pagamento />} />

                <Route path="/sucesso" element={<Sucesso />} />

                <Route path="/falha" element={<Falha />} />

                <Route path="*" element={<PaginaNaoEncontrada />} />
            </Route>
        </Routes>
    )
}

export default App
