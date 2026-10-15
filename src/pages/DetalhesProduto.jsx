import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function DetalhesProduto({ onAdicionar }) {
    const { id } = useParams()

    const [produto, setProduto] = useState(null)
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')

    useEffect(() => {
        async function buscarProduto() {
            try {
                const resposta = await fetch(
                    `http://localhost:3001/produtos/${id}`
                )

                if (!resposta.ok) {
                    throw new Error('Produto não encontrado')
                }

                const dados = await resposta.json()
                setProduto(dados)

            } catch (error) {
                console.error('Error:', error.message);
                setErro('Não foi possível carregar o produto.')

            } finally {
                setCarregando(false)
            }
        }

        buscarProduto()
    }, [id])

    if (carregando) {
        return <p>Carregando produto...</p>
    }

    if (erro) {
        return (
            <div className="container">
                <p>{erro}</p>
                <Link to="/">Voltar para a loja</Link>
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

                    <p>
                        Categoria: {produto.categoria}
                    </p>

                    <p>{produto.descricao}</p>

                    <h2>
                        R$ {produto.preco.toFixed(2)}
                    </h2>

                    <button
                        onClick={() => onAdicionar(produto)}
                    >
                        Adicionar ao carrinho
                    </button>

                    <Link to="/">Voltar para a loja</Link>
                </div>

            </div>
        </div>
    )
}

export default DetalhesProduto