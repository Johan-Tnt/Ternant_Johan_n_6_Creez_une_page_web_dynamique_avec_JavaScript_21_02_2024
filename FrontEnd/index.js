/**Debut du code Johan**/

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
  work.forEach((element) => {
    createProject(element);
  });
}
app();
/*Pour faire apparaitre les éléments du portfolio*/
function createProject(element) {
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
}

/*Affichage des boutons filtres la galerie par catégorie de projet.*/

/*Pour faire apparaitre les boutons filtres*/
const filters = document.querySelector(".filters");

/*fonction qui retourne le tableau des catégorie*/
async function getCategorys() {
  const reponse = await fetch("http://localhost:5678/api/categories");
  const data = await reponse.json();
  return data;
}

async function displayCategorysButtons() {
  const categorys = await getCategorys();
  console.log(categorys);
  /*Pour faire apparaitre les éléments des catégories*/
  categorys.forEach((category) => {
    const btn = document.createElement("button");
    btn.textContent = category.name.toUpperCase();
    btn.id = category.id;
    filters.appendChild(btn);
    /*Ajout de ma classe pour les boutons filtre ci-dessous*/
    btn.classList.add("btn_project");
  });
}
displayCategorysButtons();

/*filtrer au click les boutons par catégories*/
async function filterProject() {
  const categories = await fetchWork();
  console.log(categories);
  const buttons = document.querySelectorAll(".filters button");
  console.log(buttons);
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      btnId = e.target.id;
      popUp.innerHTML = "";
      if (btnId !== "0") {
        const projectTriCats = categories.filter((element) => {
          return element.categoryId == btnId;
        });
        projectTriCats.forEach((element) => {
          createProject(element);
          console.log(projectTriCats);
        });
      } else {
        app();
      }
      console.log(btnId);
    });
  });
}
filterProject();

/**Fin du code Johan**/
