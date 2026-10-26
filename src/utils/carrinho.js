
export function calcularTotalCarrinho(carrinho) {
    return carrinho.reduce(
        (total, item) => total + Number(item.preco) * item.quantidade,
        0
    )
}

export function calcularQuantidadeTotal(carrinho) {
    return carrinho.reduce(
        (total, item) => total + item.quantidade,
        0
    )
}
