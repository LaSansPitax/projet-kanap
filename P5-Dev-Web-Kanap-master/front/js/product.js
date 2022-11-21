const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");

fetch('http://localhost:3000/api/products')

.then((reponse) => reponse.json())
.then((data) => {
    console.log(data);
    let img = document.querySelector(".item__img");
    let title = document.getElementById("title");
    let price = document.getElementById("price");
    let description = document.getElementById("description");
    let color = document.getElementById("colors");
})


