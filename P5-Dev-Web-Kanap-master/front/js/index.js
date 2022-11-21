fetch('http://localhost:3000/api/products')

.then((reponse)=>reponse.json())
.then((data)=>affichageProduits(data))
function affichageProduits(data) {
    const itemsSelector = document.getElementById('items');
    console.log(data)

    let product = ""

    for (let i = 0; i < data.length; i++) {
        product += `<a href="./product.html?id=${data[0]._id}">
    <article>
        <img src="${data[0].imageUrl}" alt="${data[0].altTxt}">
            <h3 class="productName">${data[0].name}</h3>
            <p class="productDescription">${data[0].description}</p>
    </article>
    </a>
`;
    }

    itemsSelector.innerHTML = product
}














