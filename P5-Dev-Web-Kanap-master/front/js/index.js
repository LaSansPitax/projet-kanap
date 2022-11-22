fetch('http://localhost:3000/api/products')

.then((reponse)=>reponse.json())
.then((data)=>affichageProduits(data))
function affichageProduits(data) {
    const itemsSelector = document.getElementById('items');
    console.log(data)

    let product = ""

    for (let i = 0; i < data.length; i++) {
        product += `<a href="./product.html?id=${data[i]._id}">
    <article>
        <img src="${data[i].imageUrl}" alt="${data[i].altTxt}">
            <h3 class="productName">${data[i].name}</h3>
            <p class="productDescription">${data[i].description}</p>
    </article>
    </a>
`;
    }

    itemsSelector.innerHTML = product
}














