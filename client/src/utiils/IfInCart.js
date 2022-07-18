export const testIfInCart = (name, items, inCart) => {
    let itemIsInCart = false;
    let notYetInCart = JSON.stringify(items);

    inCart.forEach(cartItem => {
        if (cartItem.name === name) {
            let inCart = JSON.stringify(cartItem.items);
            if (inCart === notYetInCart) {
                itemIsInCart = cartItem.id;
            }
        }
    })
    return itemIsInCart
}
