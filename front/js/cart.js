function getCart(){
  let cart=[];
  let result= localStorage.getItem('cart');
  if(result){ cart=JSON.parse(result);

  }
  return cart;
}

const itemsHTMLElements = document.querySelector('cart__item');

  document.querySelector('.item__img').innerHTML=
   `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
   

                

              

window.onload= function(){
  getCart
}