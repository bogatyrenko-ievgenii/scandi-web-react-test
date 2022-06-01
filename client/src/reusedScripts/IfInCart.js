export const testIfInCart = (name, items, inCart) => {
    let itemIsInCart = false;
    // const arrayOfCart = this.props.cart.items;
    let notYetInCart = JSON.stringify(items);

    inCart.forEach((cartItem, idx) => {
        if (cartItem.name === name) {
            let inCart = JSON.stringify(cartItem.items);
            if (inCart === notYetInCart) {
                itemIsInCart = idx;
            }
        }
    })
    return itemIsInCart
}

// required arguments: 
//  name - name of product, 
//  items - tested object with: key - name of attribute, value - value of attribute,
//  inCart - is in cart yet
//return false or idx of match