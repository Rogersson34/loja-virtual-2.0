
import { Link } from 'react-router-dom'
import { useCarrinho } from '../hooks/useCarrinho'
import './Header.css'

function Header() {
    const { quantidadeTotal } = useCarrinho()

    return (
        <header className="header">
            <Link to="/produtos" className="logo">
                Loja Virtual
            </Link>

            <nav className="navegacao">
                <Link to="/produtos">
                    Produtos
                </Link>

                <Link to="/carrinho">
                    Carrinho ({quantidadeTotal})
                </Link>
            </nav>
        </header>
    )
}

export default Header
