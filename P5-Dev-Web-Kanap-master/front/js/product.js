const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");

fetch('http://localhost:3000/api/products')

.then((reponse) => reponse.json())
.then((data) => {
    console.log(data);
    
})


