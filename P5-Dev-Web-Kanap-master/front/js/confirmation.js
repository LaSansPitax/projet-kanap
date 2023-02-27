//Récupération de la chaîne de requête dans l'URL et Extraction de l'orderId (numéro de commande) de l'URL
let urlOrderId = new URLSearchParams(window.location.search).get("orderId");

//Ajout d'une condition dans le cas ou il n'y a pas d'orderId dans l'URL alors on redirige sur la page d'accueil du site
if (urlOrderId === null || urlOrderId === "") {
  alert(
    "Une erreur s'est produite lors de la validation de votre commande. Veuillez nous en excuser !"
  );
  window.location.href = "index.html";
}
//Sinon, on affiche la confirmation de la commande et le numéro de commande
else {
  // Sélection de l'id dans l'html pour le numéro de  commande
  const idCommande = document.getElementById("orderId");
  // On insère le numéro de commande dans le html
  idCommande.innerText = urlOrderId;
  console.log(idCommande);
}
