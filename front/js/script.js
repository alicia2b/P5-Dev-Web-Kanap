const itemsHTMLElements = document.querySelector('#items')

fetch('http://localhost:3000/api/products')
.then(response => response.json())
.then(products => {
    for (product of products) {
        itemsHTMLElements.insertAdjacentHTML('afterbegin', `
            <a href="./product.html?id=${product._id}">
                <article>
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                    <h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}</p>
                </article>
            </a>
        `)
    }
})

