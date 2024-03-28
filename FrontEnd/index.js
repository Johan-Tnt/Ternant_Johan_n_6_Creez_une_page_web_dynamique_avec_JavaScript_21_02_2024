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
    btn.textContent = category.name;
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
          createProject(element); /*Permet le filtrage des projets*/
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

/*Si l'utilisateur est connecté*/
const loged = sessionStorage.getItem("token");
const admin = document.querySelector(".admin");
const logout = document.querySelector(".logout");
console.log(admin);

if (loged != "undefined") {
  /*Fait apparaître le mot "logout" et permet de déconnecter l'admin*/
  logout.textContent = "logout";
  logout.addEventListener("click", () => {
    sessionStorage.setItem("token", undefined);
  });
  /*Permet de faire disparaitre les boutons "filtres*/
  filters.style.display = "none";
}

/*Au click sur Admin affichage des modales*/
const containerModals = document.querySelector(".containerModals");
const xmark = document.querySelector(".containerModals .fa-xmark");
const pictureModal = document.querySelector(".pictureModal");
const buttonModal = document.querySelector(".button_modale");

function manageDisplayModalGallery(params) {
  /*Fonction qui gère l'affichage de "modifier" lorsque que l'admin est connecté*/
  if (loged != "undefined") {
    buttonModal.style.display = "flex";
    /*Fonction qui gère l'affichage de la modale au click sur "modifier"*/
    const buttonModification = document.querySelectorAll(".button_modale");
    console.log(buttonModification);
    buttonModification.forEach((button) => {
      button.addEventListener("click", (e) => {
        console.log("boutton");
        containerModals.style.display = "flex";
      });
    });
  }
  /*Gère la fermeture de la modale sur la croix*/
  xmark.addEventListener("click", () => {
    console.log("xmark");
    containerModals.style.display = "none";
  });
  /*Gère la fermeture sur le container en dehors */
  containerModals.addEventListener("click", (e) => {
    console.log(e.target.className);
    console.log("containerModals");
    if (e.target.className == "containerModals") {
      containerModals.style.display = "none";
    }
  });
}
manageDisplayModalGallery();

/*Affichage des photos dans la galerie*/
async function displayGalleryModal() {
  pictureModal.innerHTML = "";
  const gallery = await fetchWork();
  gallery.forEach((picture) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const span = document.createElement("span");
    const trash = document.createElement("i");
    trash.classList.add("fa-solid", "fa-trash-can");
    trash.id = picture.id;
    img.src = picture.imageUrl;
    span.appendChild(trash);
    figure.appendChild(span);
    figure.appendChild(img);
    pictureModal.appendChild(figure);
  });
}
displayGalleryModal();

/**Fin du code Johan**/
