//appel fetch pour pouvoir accéder aux éléments contenu dans l'api
fetch("http://localhost:3000/api/products")
  .then((reponse) => reponse.json())
  .then((data) => affichageProduits(data));
//Création d'une fonction pour pouvoir afficher les produits sur la page principale
function affichageProduits(data) {
  //Déclaration d'une variable pour pouvoir sélectionner nos éléments grace à leurs id
  const itemsSelector = document.getElementById("items");
  //console.log(data)

  //Déclaration d'une variable qui contiendra les éléments qui seront intégrés par la suite
  let product = "";

  //Boucle pour pouvoir afficher tous nos produits grace au templating
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

  //Affichage de nos éléments sur la page d'accueil
  itemsSelector.innerHTML = product;
}
