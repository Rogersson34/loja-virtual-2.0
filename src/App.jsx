import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Carrinho from './pages/Carrinho.jsx'
import Pagamento from './pages/Pagamento.jsx'
import Sucesso from './pages/Sucesso.jsx'
import Falha from './pages/Falha.jsx'
import './App.css'

function App() {
    const [listaProdutos, setListaProdutos] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')

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
                console.error('Error:', error.message);
                setErro('Não foi possível carregar os produtos.')

            } finally {
                setCarregando(false)
            }
        }

        buscarProdutos()
    }, [])

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

        alert(`Produto ${produto.nome} adicionado ao carrinho!`)
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

    function removerDoCarrinho(id) {

        const novoCarrinho = carrinho.filter(
            item => item.id !== id
        )

        setCarrinho(novoCarrinho)
    }

    const quantidadeTotal = carrinho.reduce(
        (total, item) => total + item.quantidade,
        0
    )


    return (

        <Routes>

            <Route
                path="/"
                element={

                    < div className="container" >

                        <h1>Loja Virtual</h1>

                        <p>
                            Itens no carrinho: <strong>{quantidadeTotal}</strong>
                        </p>

                        <Carrinho
                            itens={carrinho}
                            onRemover={removerDoCarrinho}
                            onAtualizarQuantidade={atualizarQuantidade}
                        />

                        {carregando && <p>Carregando produtos...</p>}

                        {erro && <p className="mensagem-erro">{erro}</p>}


                        <div className="produtos-grid">

                            {listaProdutos.map((produto) => (

                                <div
                                    key={produto.id}
                                    className="produto-card"
                                >

                                    {produto.imagem && (
                                        <img
                                            src={produto.imagem}
                                            alt={produto.nome}
                                        />
                                    )}


                                    <h2>{produto.nome}</h2>


                                    <p className="preco">
                                        R$ {produto.preco.toFixed(2)}
                                    </p>


                                    <button
                                        onClick={() =>
                                            adicionarAoCarrinho(produto)
                                        }
                                    >
                                        Adicionar ao carrinho
                                    </button>

                                </div>

                            ))}

                        </div>
                    </ div >


                }

            />

            < Route path="/pagamento" element={< Pagamento />}
            />

            <Route path="/sucesso" element={<Sucesso />} />

            <Route path="/falha" element={<Falha />} />

        </Routes >

    )
}

export default App

