function getOneProduct() {
  const recherche= window.location.search;
  const urlParams= new URLSearchParams(recherche);
  const product_ID= urlParams.get('id');

fetch("http://localhost:3000/api/products/"+product_ID)
.then(response => response.json())
.then(product=>{
  document.querySelector('#title').innerHTML=product.name;
  document.querySelector('#price').innerHTML=product.price;
  document.querySelector('#description').innerHTML=product.description;
  document.querySelector('.item__img').innerHTML=`<img src="${product.imageUrl}" alt="${product.altTxt}">` 

 
})}










/*function getOneProduct(){
    const recherche = window.location.search;
    const urlParams = new URLSearchParams(recherche);
    const product_ID = urlParams.get('id');
    
    
fetch("http://localhost:3000/api/products/"+product_ID)
.then(response => response.json())
.then(product =>{
   document.querySelector('#title').innerHTML=product.name;
   document.querySelector('#price').innerHTML=product.price;
   document.querySelector('#description').innerHTML=product.description;
   document.querySelector('.item__img').innerHTML=
   `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    let optionTpl= `<option value="vert">vert</option>`;
    console.log(product)
    for (let i=0; i<product.colors.length;i++){
        let optionColor=document.createElement('option');
        optionColor.value=product.colors[i];
        optionColor.innerHTML=product.colors[i];
        document.querySelector('#colors').appendChild(optionColor)
    }
});
}

/*evenement quand la page est chargée*/
window.onload= function(){
    document.getElementById('addToCart').onclick=addToCart;
    getOneProduct();
}

function addToCart(){
    const recherche = window.location.search;
    const urlParams = new URLSearchParams(recherche);
    const product_ID = urlParams.get('id');
    let color=  document.getElementById('colors').value;
    let quantity= document.getElementById('quantity').value;

    if(color==""){
        alert('Veuillez choisir votre couleur');
        return;
    }
    if(quantity==0){
        alert('Veuillez choisir une quantité');
        return;
    }
    
    addProduct(product_ID,quantity,color);
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


//le paramètre "product_ID" de la fonction n'est plus utilisé, tu peux le supprimer à moins que si tu veux que la même fonction gère le regroupement par couleur par exemple...
let groupedById = groupBy();
console.log("original Cart :", getCart(), ", grouped By ID Cart :", groupedById);









