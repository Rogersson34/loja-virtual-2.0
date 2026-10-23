
import { Link } from 'react-router-dom'

function ProdutoCard({ produto, onAdicionar }) {
    return (
        <div className="produto-card">
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

            <p className="categoria">
                {produto.categoria}
            </p>

            <p className="preco">
                {Number(produto.preco).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })}
            </p>

            <button onClick={() => onAdicionar(produto)}>
                Adicionar ao carrinho
            </button>
        </div>
    )
}

export default ProdutoCard
