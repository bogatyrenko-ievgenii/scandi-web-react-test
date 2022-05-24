const stringified = (value) => {
    return JSON.stringify(value)
}

const parsed = (value) => {
    return JSON.parse(value)
}

const addArrToLS = (cart) => {
    let cartLS = localStorage.getItem('cart');
    if (!cartLS) {
        localStorage.setItem('cart', stringified(cart))
    } else {

    }
}

