const tplproducts=`<a href="./product.html?id=%_id%">
<article>
  <img src="%imageUrl%" alt="%altTxt%">
  <h3 class="productName">%name%</h3>
  <p class="productDescription">%des02cription%</p>
</article>
</a>`;

fetch ("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json()
      .then(data => {
    console.log(data);
  })
}
  else {
    console.log('une erreur est survenue');
  }
})
for (let i=0;
i<produit.length;i++){
  let produits=Object.keys(produit);
let element= document.createElement('a');
document.getElementById('items').appendChild(element);

element.outerHTML(produit);

}  
 