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
function groupBy(product_ID) {
    return getCart().reduce((groups, item) => {
      let final = (groups[item.product_ID] || []),
        sameIdAndColorIndex = final.map(elem => {
          if (elem.product_ID == item.product_ID &&
            elem.color == item.color)
            return elem.product_ID;
        }).indexOf(item.product_ID);
      if (sameIdAndColorIndex == -1)
        final.push(item);
      else 
        final[sameIdAndColorIndex].quantity += item.quantity;
      groups[item.product_ID] = final;
      return groups;
    }, {});
}
  
