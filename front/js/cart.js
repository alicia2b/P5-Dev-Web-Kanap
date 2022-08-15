
const cartItemsElement = document.querySelector('#cart__items');
const totalPriceElement = document.querySelector('#totalPrice');
const totalQuantityElement = document.querySelector('#totalQuantity');
let totalPrice=0;
let totalQuantity=0;
const sectionElement=document.getElementById('cart__items');

let cart= localStorage.getItem('cart');
let cartItems= JSON.parse(cart);

if(cart !=null){
  for (let cartItem of cartItems) {
    fetch('http://localhost:3000/api/products/' + cartItem.id)
    .then(response => response.json())
      .then (product =>{
        // calcul prix total
        totalPrice+=product.price*cartItem.quantity;
        totalQuantity+=cartItem.quantity;
        totalPriceElement.innerText=totalPrice;
        totalQuantityElement.innerText=totalQuantity;
     cartItemsElement.insertAdjacentHTML('afterbegin',`<article class="cart__item" data-id="${cartItem.id}" data-color="${cartItem.color}">
     <div class="cart__item__img">
      <img src="${product.imageUrl}" alt="${product.altTxt}">
     </div>
     <div class="cart__item__content">
       <div class="cart__item__content__description">
         <h2>${product.name}</h2>
         <p>${cartItem.color}</p>
         <p>${product.price}	\u20ac</p>
       </div>
       <div class="cart__item__content__settings">
         <div class="cart__item__content__settings__quantity">
           <p>Qté : </p>
           <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartItem.quantity}">
         </div>
         <div class="cart__item__content__settings__delete">
           <p class="deleteItem">Supprimer</p>
         </div>
       </div>
     </div>
   </article>`)
      })
      
  }
 
}
else{
  alert('votre panier est vide');
}

/* changement quantité*/

sectionElement.addEventListener('click',(e)=>{
  const parentElement = e.target.closest('.cart__item');
  const id = parentElement.dataset.id;
  const color = parentElement.dataset.color;
  const productIndex=cartItems.findIndex(product=>product.id==id && product.color==color);
  if(e.target.className=='itemQuantity'){
    const quantity=+e.target.value;
    cartItems[productIndex].quantity=quantity;
    localStorage.setItem(cart,JSON.stringify(cartItems));
   
    
  }
  if(e.target.className=='deleteItem'){
    cartItems.splice(productIndex,1);
    localStorage.setItem(cart,JSON.stringify(cartItems));
    cartItem.remove();
  }
})





/********formulaire** */
const regexText=/^[a-zA-Z]+$/;
const regexEmail=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const submitbutton=document.getElementById('order');
const inputFirstName = document.getElementById("firstName");
  const inputLastName = document.getElementById("lastName");
  const inputAddress = document.getElementById("address");
  const inputCity = document.getElementById("city");
  const inputEmail = document.getElementById("email");
  const errorFirstName= document.getElementById("firstNameErrorMsg") ;
  const errorLastName= document.getElementById("lastNameErrorMsg");
  const errorAddress= document.getElementById("addressErrorMsg");
  const errorCity= document.getElementById("cityErrorMsg");
  const errorEmail= document.getElementById("emailErrorMsg");



submitbutton.addEventListener('click', e => {
  e.preventDefault();

  
  if (!inputFirstName.value.match(regexText)){
  
    errorFirstName.innerText='Veuillez renseigner un prénom valide';
  }
  else{
    errorFirstName.innerText='';
  }
  
  if (!inputLastName.value.match(regexText)){
  
    errorLastName.innerText='Veuillez renseigner un nom valide';
  }
  else{
    errorLastName.innerText='';
  }
  if (!inputAddress.value.match(regexText)){
  
    errorAddress.innerText='Veuillez renseigner une adresse valide';
  }
  else{
    errorAddress.innerText='';
  }
  if (!inputCity.value.match(regexText)){
  
    errorCity.innerText='Veuillez renseigner une ville valide';
  }
  else{
    errorCity.innerText='';
 
  }
  if (!inputEmail.value.match(regexEmail)){
  
    errorEmail.innerText='Veuillez renseigner un email valide';
  }
  else{
    errorEmail.innerText='';
 
  }
  
 if (errorFirstName.innerText=='' && errorLastName.innerText==''&& errorAddress.innerText==''&& errorCity.innerText=='' && errorEmail.innerText==''){
    const productsIds = cartItems.map(product => product.id);
   let contact={
    firstName: inputFirstName.value,
    lastName:inputLastName.value,
    address:inputAddress.value,
    city:inputCity.value,
    email:inputEmail.value
   };
   console.log(productsIds,contact)
  fetch("http://localhost:3000/api/products/order", {
           
             method: "POST",
             body:JSON.stringify({ products: productsIds, contact:contact}),
             headers: {
                 "Content-Type": "application/json",
             }
         })    
         .then((response) => {
             return response.json();
         })
         .then((data) => {
             localStorage.removeItem('cart');
           window.location.href = `confirmation.html?id=${data.orderId}`;
         });
         alert('Votre commande est enregistrée');
     };
 
 
 });
 
 







  