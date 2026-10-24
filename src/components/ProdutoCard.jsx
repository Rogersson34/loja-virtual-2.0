
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

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

ProdutoCard.propTypes = {
    produto: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        nome: PropTypes.string.isRequired,
        imagem: PropTypes.string,
        categoria: PropTypes.string.isRequired,
        preco: PropTypes.number.isRequired
    }).isRequired,
    onAdicionar: PropTypes.func.isRequired
}

export default ProdutoCard
