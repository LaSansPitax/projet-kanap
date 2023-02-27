//Creation d'un lien entre les pages grace à la récupération de l'id contenu dans l'URL graissait à la méthode get
const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");

console.log(id);

fetch(`http://localhost:3000/api/products/${id}`)
  .then((reponse) => reponse.json())
  .then((data) => affichageProduits(data));

//Création d'une fonction pour pouvoir afficher les produits sur la page produit
function affichageProduits(data) {
  console.log(data);
  //Déclaration et intégration des éléments ciblaient grace au templating en ciblant les attributs
  let img = document.querySelector(".item__img");
  img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
  let title = document.getElementById("title");
  title.innerHTML = data.name;
  let price = document.getElementById("price");
  price.innerHTML = `${data.price}`;
  let description = document.getElementById("description");
  description.innerHTML = data.description;
  let color = document.getElementById("colors");
  for (let i = 0; i < data.colors.length; i++) {
    color.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
  }
}

//Déclaration d'une variable pour le bouton d'ajout au panier
let addToCartBtn = document.getElementById("addToCart");

//Déclaration de la fonction d'ajout au panier contenant en paramètre l'id la couleur et la quantité
function addtoCart(id, color, quantity) {
  //Récupération des elements du panier contenu dans le local storage (dans le cas ou le panier n'existe pas dans le local storage on utilise un tableau vide)
  let cartData = JSON.parse(localStorage.getItem("cart")) || [];
  //Recherche de l'index dans le panier grace à findIndex qui parcour le tableau et trouver l'index qui possède l'id et la couleur spécifiée
  let productIndex = cartData.findIndex(
    (product) => product.id == id && product.color == color
  );
  //Ajout d'une condition si le produit est déjà présent dans le panier on incrémente la quantité du produit dans le panier
  if (productIndex > -1) {
    cartData[productIndex].quantity += quantity;
  }
  //Dans le cas contraire on ajoute un nouvel element dans le tableau grace à .push
  else {
    cartData.push({ id: id, color, quantity: quantity });
  }

  //Mise a jour des données du panier dans le local storage
  localStorage.setItem("cart", JSON.stringify(cartData));
}

//Gestionnaire d'événement pour le boutton d'ajout au panier lorsque le boutton `addToCartBtn ` est cliqué, on récupère la couleur et la quantité, grace aux inputs
//correspondant puis on ajoute au panier grace à la fonction addtoCart en passant l'id la couleur et la quantité du produit en paramètre
addToCartBtn.addEventListener("click", () => {
  let color = document.getElementById("colors").value;
  let quantity = parseInt(document.getElementById("quantity").value);
  addtoCart(id, color, quantity);
});

//function pour sauvgarder les items dans le panier dans le local storage
function saveItems(panier) {
  localStorage.setItem("produits", JSON.stringify(panier));
}

//function pour acceder a un produits dans le panier
function getItems() {
  localStorage.getItem("produits");
}
