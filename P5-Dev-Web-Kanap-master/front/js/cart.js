// Récupération du localStorage
let productInLocalStorage = JSON.parse(localStorage.getItem("cart"));
console.log(productInLocalStorage);
//Sélection de la balise dans laquel on insère les produits
let cartContener = document.getElementById("cart__items");

//Déclaration d'une variable qui contiendra les éléments qui seront intégrés par la suite
let product = "";

//appel fetch pour pouvoir accéder aux éléments contenu dans l'api
fetch(`http://localhost:3000/api/products/`)
  .then((reponse) => reponse.json())
  .then((data) => affichageProduits(data));

//Création d'une fonction pour trouver les produits à afficher par la suite
function findProduct(id, data) {
  return data.find((e) => e._id === id);
}

//Création d'une fonction pour afficher les produits qui seront intégrés par la suite
function affichageProduits(data) {
  console.log(data);
  //Boucle pour pouvoir afficher tous les éléments qui seront dans le local storage
  for (let i = 0; i < productInLocalStorage.length; i++) {
    const element = productInLocalStorage[i];

    //Création d'une variable permettant de stocker dans in objet les paramètre de notre produit contenu dans le local storage
    let dataOneProduct = findProduct(productInLocalStorage[i].id, data);
    console.log(dataOneProduct);
    //Déclaration de la variable totalquantity et prince à 0 pour qu'elles puissent changer au moment de l'ajout de produits
    let totalQuantity = 0;
    let totalPrice = 0;
    // Boucle d'affichage du nombre total d'articles dans le panier et de la somme totale
    for (let i = 0; i < productInLocalStorage.length; i++) {
      totalQuantity += parseInt(productInLocalStorage[i].quantity);
      totalPrice += parseInt(
        dataOneProduct.price * productInLocalStorage[i].quantity
      );
    }
    //Intégration des éléments cibler grace au templating en ciblant les attributs
    product += `<article class="cart__item" data-id="${productInLocalStorage[i].id}" data-color="${productInLocalStorage[i].color}" >
                <div class="cart__item__img">
                  <img src="${dataOneProduct.imageUrl}"  alt="${dataOneProduct.altTxt}">
                </div>
                <div class="cart__item__content"
                  <div class="cart__item__content__description">
                    <h2>"${dataOneProduct.name}"</h2>
                    <p>"${productInLocalStorage[i].color}"</p>
                    <p>"${dataOneProduct.price}" €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" data-id="${productInLocalStorage[i].id}" data-color="${productInLocalStorage[i].color}">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
    //Affichage des éléments
    cartContener.innerHTML = product;

    document.getElementById("totalQuantity").innerHTML = totalQuantity;
    document.getElementById("totalPrice").innerHTML = totalPrice;
  }

  //Création de la fonction de changement de quantité
  function changeQuantity() {
    //Sélection de tous les éléments avec la classe "itemQuantity"
    let quantityBtn = document.querySelectorAll(".itemQuantity");
    //Appliquer a tous les boutons de quantité
    quantityBtn.forEach((quantityBtn, i) => {
      //Écouter l'événement "change"
      quantityBtn.addEventListener("change", (event) => {
        //Éviter le comportement par défaut de l'événement
        event.preventDefault();
        //Mettre a jour la quantité du produit dans le porductinLocalStorage
        productInLocalStorage[i].quantity = parseInt(quantityBtn.value);
        //Enregistrement des modification dans le localstorage
        localStorage.setItem("cart", JSON.stringify(productInLocalStorage));
        //Rafraichissement de la page
        location.reload();
      });
    });
  }
  //Appel de la fonction
  changeQuantity();

  //Création de la fonction de la suppression d'un element
  function deleteItem() {
    //Sélection de tous les éléments avec la classe "deleteItem"
    let deleteBtn = document.querySelectorAll(".deleteItem");
    //Appliquer a tous les boutons de suppression
    deleteBtn.forEach((deleteButton) => {
      //Écouter l'événement "click"
      deleteButton.addEventListener("click", (event) => {
        //Éviter le comportement par défaut de l'événement
        event.preventDefault();
        //Déclaration de variable deleteId qui prend pour cible l'attribut "data-id"
        const deleteId = event.target.getAttribute("data-id");
        //Déclaration de variable deleteId qui prend pour cible l'attribut "data-color"
        const deleteColor = event.target.getAttribute("data-color");
        //Filtrer les elements grace a une fonction flecher qui filtre dans le tableau productInLocalStorage et qui supprime les elements
        productInLocalStorage = productInLocalStorage.filter(
          (element) => !(element.id == deleteId && element.color == deleteColor)
        );
        console.log(productInLocalStorage);
        // Mise à jour du localStorage
        localStorage.setItem("cart", JSON.stringify(productInLocalStorage));
        //Rafraichissement de la page
        location.reload();
      });
    });
  }
  //Appel de la fonction
  deleteItem();
}

//Création d'une variable qui sélectionne le bouton Valider
let validateBtn = document.querySelector("#order");

//Écouter l'événement "click" de la validation du formulaire
validateBtn.addEventListener("click", (e) => {
  //Éviter le comportement par défaut de l'événement
  e.preventDefault();

  //Création de l'objet contact contenant la valeur des différents champs a validé
  let contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };

  //Création du regex pour le contrôle des champs Prénom, Nom et Ville
  let regExPrenomNomVille = (value) => {
    return /^[A-Z][A-Za-z\é\è\ê\-]+$/.test(value);
  };

  //Création du regex pour le contrôle des champs adresse
  let regExAdresse = (value) => {
    return /^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,2}$/.test(value);
  };
  //Création du regex pour le contrôle des champs email
  let regExEmail = (value) => {
    return /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(
      value
    );
  };
  // Fonctions de contrôle du champ Prénom:
  function firstNameValidation() {
    //Déclaration du variable prénom qui contient le firstName contenu dans l'objet contact
    let prenom = contact.firstName;
    //Création de la condition si le champ est correct retourner vrai
    if (regExPrenomNomVille(prenom)) {
      document.querySelector("#firstNameErrorMsg").textContent = "";
      return true;
    }
    //Si le champ est incorrect retourner faux et un message d'erreur
    else {
      document.querySelector("#firstNameErrorMsg").textContent =
        "Champ de formulaire Prénom invalide, ex: Christophe";
      return false;
    }
  }

  function lastNameValidation() {
    //Déclaration du variable nom qui contient le lastNam contenu dans l'objet contact
    const nom = contact.lastName;
    //Création de la condition si le champ est correct retourner vrai
    if (regExPrenomNomVille(nom)) {
      document.querySelector("#lastNameErrorMsg").textContent = "";
      return true;
    }
    //Si le champ est incorrect retourner faux et un message d'erreur
    else {
      document.querySelector("#lastNameErrorMsg").textContent =
        "Champ de formulaire Nom  invalide, ex: Dupont";
      return false;
    }
  }

  function adressValidation() {
    //Déclaration du variable adresse  qui contient l'address contenu dans l'objet contact
    const adresse = contact.address;
    //Création de la condition si le champ est correct retourner vrai
    if (regExAdresse(adresse)) {
      document.querySelector("#addressErrorMsg").textContent = "";
      return true;
    }
    //Si le champ est incorrect retourner faux et un message d'erreur
    else {
      document.querySelector("#adressErrorMsg").textContent =
        "Champ de formulaire adresse invalide, ex: 2 rue de la paix ";
      return false;
    }
  }

  function cityValidation() {
    //Déclaration du variable ville qui contient le city contenu dans l'objet contact
    const ville = contact.city;
    //Création de la condition si le champ est correct retourner vrai
    if (regExPrenomNomVille(ville)) {
      document.querySelector("#cityErrorMsg").textContent = "";
      return true;
    }
    //Si le champ est incorrect retourner faux et un message d'erreur
    else {
      document.querySelector("#cityErrorMsg").textContent =
        "Champ de formulaire ville invalide, ex:Paris ";
      return false;
    }
  }

  function mailValidation() {
    //Déclaration du variable courriel qui contient le email contenu dans l'objet contact
    const courriel = contact.email;
    //Création de la condition si le champ est correct retourner vrai
    if (regExEmail(courriel)) {
      document.querySelector("#emailErrorMsg").textContent = "";
      return true;
    }
    //Si le champ est incorrect retourner faux et un message d'erreur
    else {
      document.querySelector("#emailErrorMsg").textContent =
        "Champ de formulaire ville invalide, ex: exemple@contact.fr ";
      return false;
    }
  }

  //Création de la condition si le champ est correct appeler de la fonction
  if (
    //Appel des fonctions
    firstNameValidation() &&
    lastNameValidation() &&
    adressValidation() &&
    cityValidation() &&
    mailValidation()
  ) {
    // Enregistrement du  formulaire dans le local storage
    localStorage.setItem("contact", JSON.stringify(contact));
    document.querySelector("#order").value =
      "Articles et formulaire valide vous pouvez Passer commande !";
    //Appel de la fonction
    sendToServer();
    //Si les champs sont incorrects retourner faux et un message d'erreur
  } else {
    alert("Veuillez remplir le formulaire correctement");
  }

  //Création de la fonction d'envoi au serveur
  function sendToServer() {
    //Récuperation des id dans le localstorage
    let products = [];

    for (let i = 0; i < productInLocalStorage.length; i++) {
      products.push(productInLocalStorage[i].id);
    }
    //Déclaration de l'objet contenant les informations contenues dans le local storage (tableaux contenant les produits et les informations renseignées par le client)
    let orderInfo = {
      contact,
      products,
    };
    console.log(orderInfo);
    //Requête au serveur et post des données
    let sendToServ = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderInfo),
    };

    // on envoie les données Contact et l'id des produits à l'API
    fetch("http://localhost:3000/api/products/order", sendToServ)
      .then((response) => response.json())
      .then((data) => {
        document.location.href = `confirmation.html?orderId=${data.orderId}`;
        console.log(data.orderId);
      })

      .catch((err) => {
        console.log("Erreur Fetch product.js", err);
        alert("Un problème a été rencontré lors de l'envoi du formulaire.");
      });
  }
  //Suppression du localstorage un fois valider
  localStorage.clear();
});
