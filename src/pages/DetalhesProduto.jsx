import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCarrinho } from '../hooks/useCarrinho'

function DetalhesProduto() {
    const { id } = useParams()
    const { adicionarAoCarrinho } = useCarrinho()

    const [produto, setProduto] = useState(null)
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')

    useEffect(() => {
        async function buscarProduto() {
            try {
                setCarregando(true)
                setErro('')

                const resposta = await fetch(
                    `http://localhost:3001/produtos/${id}`
                )

                if (!resposta.ok) {
                    throw new Error('Produto não encontrado')
                }

                const dados = await resposta.json()
                setProduto(dados)
            } catch (error) {
                console.error('Erro ao buscar produto:', error)
                setErro('Não foi possível carregar o produto.')
            } finally {
                setCarregando(false)
            }
        }

        buscarProduto()
    }, [id])

    function adicionarProduto() {
        adicionarAoCarrinho(produto)
        alert(`Produto ${produto.nome} adicionado ao carrinho!`)
    }

    if (carregando) {
        return (
            <div className="container">
                <p>Carregando produto...</p>
            </div>
        )
    }

    if (erro || !produto) {
        return (
            <div className="container">
                <h1>Produto não encontrado</h1>
                <p>{erro || 'Esse produto não existe.'}</p>
                <Link to="/produtos">Voltar para os produtos</Link>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="detalhes-produto">
                <img
                    src={produto.imagem}
                    alt={produto.nome}
                />

                <div className="detalhes-info">
                    <h1>{produto.nome}</h1>

                    <p>Categoria: {produto.categoria}</p>

                    <p>{produto.descricao}</p>

                    <h2>
                        R$ {Number(produto.preco).toFixed(2)}
                    </h2>

                    <button onClick={adicionarProduto}>
                        Adicionar ao carrinho
                    </button>

                    <p>
                        <Link to="/produtos">
                            Voltar para os produtos
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DetalhesProduto
