function setCart(cart){
    localStorage.setItem('cart',JSON.stringify(cart))
}

function getCart(){
    let cart=[];
    let result= localStorage.getItem('cart');
    if(result){ cart=JSON.parse(result);

    }
    return cart;
}
function addProduct(product_ID,quantity,color){
let line={'product_ID':product_ID,'color':color,'quantity':quantity}
let cart=getCart();
cart.push(line);
setCart(cart);
}
