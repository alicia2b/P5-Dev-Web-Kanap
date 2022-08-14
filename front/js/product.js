const id = new URLSearchParams(window.location.search).get('id');


const colorsElement = document.querySelector('#colors');
const addToCartButton = document.querySelector('#addToCart');
const quantityElement = document.querySelector('#quantity');

 
fetch("http://localhost:3000/api/products/"+id)
.then(response => response.json())
.then(product=>{
  document.querySelector('#title').innerHTML=product.name;
  document.querySelector('#price').innerHTML=product.price;
  document.querySelector('#description').innerHTML=product.description;
  document.querySelector('.item__img').innerHTML=`<img src="${product.imageUrl}" alt="${product.altTxt}">` 
  
for (let color of product.colors) { 
colorsElement.insertAdjacentHTML('beforeend',`<option value="${color}">${color}</option>`);
}
})

addToCartButton.addEventListener('click',e=>{
const quantity= +quantityElement.value;
const color = colorsElement.value;
if (quantity<=0 || quantity>100|| color==''){
  alert('veuillez selectionner une quantité et une couleur');
}
  else {
    let cart = localStorage.getItem('cart');
    if(cart==null){
      let cartItems=[];
      cartItems.push({
        id:id,
        color:color,
        quantity:quantity
      });
      localStorage.setItem('cart',JSON.stringify(cartItems));
    }
    else {
      let cartItems = JSON.parse(cart);
      let productIndex= cartItems.findIndex(product=>product.id==id && product.color==color);
      if (productIndex<0)
      {
        cartItems.push({
          id:id,
          color:color,
          quantity:quantity,
        });
      }
        else{
          cartItems[productIndex].quantity+= quantity;
        }
        localStorage.setItem('cart',JSON.stringify(cartItems));
        alert('produit ajouté avec succès');
      }
    }
}
);










