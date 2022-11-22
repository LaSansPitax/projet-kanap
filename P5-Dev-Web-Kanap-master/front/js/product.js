const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");

fetch('http://localhost:3000/api/products')

.then((reponse) => reponse.json())
.then((data) => affichageProduits(data))

function affichageProduits(data) {
    console.log(data)

    let img = document.querySelector(".item__img");
    img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    let title = document.getElementById("title");
    title.innerHTML = data.name;
    let price = document.getElementById("price");
    price.innerHTML = `${data.price}`;
    let description = document.getElementById("description");
    description.innerHTML = data.description;
    let color = document.getElementById("colors");
    color.innerHTML = `<option value="${data.colors}">${data.colors}</option>`;
    }
