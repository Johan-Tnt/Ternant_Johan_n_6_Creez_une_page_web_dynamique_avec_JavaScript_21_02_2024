/**Debut du code Johan**/
/*test de fonctionnement*/
console.log("Hello world");

/*fonction qui retourne le tableau des works*/
async function fetchWork() {
  const reponse = await fetch("http://localhost:5678/api/works");
  const data = await reponse.json();
  return data;
}

/*Pour faire apparaitre toute la section*/
const popUp = document.querySelector(".gallery");

/*Affichage des works*/
async function app() {
  const work = await fetchWork();
  console.log(work);
  /*Début pour faire apparaitre les éléments du portfolio*/
  work.forEach((element) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    img.src = element.imageUrl;
    figcaption.textContent = element.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    popUp.appendChild(figure); /*Pour faire apparaitre toute la section*/
    console.log(figure);
    console.log(img);
    console.log(popUp);
  });
}
app();

/**Fin du code Johan**/
