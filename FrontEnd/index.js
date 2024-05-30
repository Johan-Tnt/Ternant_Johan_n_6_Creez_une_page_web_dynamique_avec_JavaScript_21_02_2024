/**Debut du code Johan**/

/**Code des Projets**/
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
  popUp.innerHTML = "";
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
}

/*Affichage des boutons filtres pour la galerie par catégorie de projet.*/

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
  const buttons = document.querySelectorAll(".filters button");
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
        });
      } else {
        app();
      }
    });
  });
}
filterProject();

/**Code du Login**/
/*Lorsque l'utilisateur est connecté*/
const loged = sessionStorage.getItem("token");
const admin = document.querySelector(".admin");
const logout = document.querySelector(".logout");

/*Pour ajouter le mode édition du site lorsque l'on est login*/
const edition = document.querySelector(".edition_mode .fa-pen-to-square");
const banner = document.querySelector(".word_edition ");
const mode = document.querySelector(".banner_edition ");
const alignement = document.querySelector(".logo_default ");

/*Au click sur le btn "Modifier" affichage des modales lorsque l'on est Administrateur*/
const buttonModal = document.querySelector(".button_modal");

if (loged == "undefined" || loged == null) {
  buttonModal.style.display = "none";
  banner.style.display = "none";
  edition.style.display = "none";
  mode.style.display = "none";
} else {
  /*Fait apparaître le mot "logout" et permet de déconnecter l'admin*/
  logout.textContent = "logout";
  /*Ajout du texte et de la classe pour le mode édition*/
  banner.textContent = "Mode édition";
  banner.classList.add("banner_mode");
  alignement.classList.add("alignement_logo");
  edition.classList.add("banner_mode");
  logout.addEventListener("click", () => {
    sessionStorage.setItem("token", undefined);
  });
  /*Permet de faire disparaitre les boutons "filtres*/
  filters.style.display = "none";
}

/**Code de la modal n°1**/
/*Au click sur le btn "Modifier" affichage des modales lorsque l'on est Administrateur*/
const containerModals = document.querySelector(".containerModals");
const xmark = document.querySelector(".containerModals .fa-xmark");
const pictureModal = document.querySelector(".pictureModal");

function manageDisplayModalGallery(params) {
  /*Fonction qui gère l'affichage de "modifier" lorsque que l'admin est connecté*/
  if (loged == "undefined" || loged == null) {
  } else {
    buttonModal.style.display = "flex";
    /*Fonction qui gère l'affichage de la modale au click sur "modifier"*/
    const buttonModification = document.querySelectorAll(".button_modal");
    buttonModification.forEach((button) => {
      button.addEventListener("click", (e) => {
        containerModals.style.display = "flex";
      });
    });
  }
  /*Gère la fermeture de la modal sur la croix*/
  xmark.addEventListener("click", () => {
    containerModals.style.display = "none";
  });
  /*Gère la fermeture sur le container en dehors*/
  containerModals.addEventListener("click", (e) => {
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
  deleteProject(); /*Fonction qui permet de supprimé une image*/
}
displayGalleryModal();

/*Suppression d'une image avec la méthode "delete" pour la modale n°1*/
function deleteProject() {
  const trashAll = document.querySelectorAll(".fa-trash-can");
  trashAll.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      e.preventDefault();
      const id = trash.id;
      const init = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${loged}`,
        } /*Pour autoriser la supression des "works"*/,
      };
      fetch("http://localhost:5678/api/works/" + id, init)
        .then((response) => {
          if (!response.ok) {
          }
          return response;
          /*Echec de la supression de la photo*/
        })
        .then((data) => {
          displayGalleryModal();
          app();
          /*Supression de la photo réussie*/
        });
    });
  });
}

/**Code de la modal n°2**/
/*Fait apparaître la deuxième modale une fois le html terminer*/
const buttonAddModal = document.querySelector(".modalGallery button");
const modalAddProject = document.querySelector(".modalAddProject");
const modalGallery = document.querySelector(".modalGallery");
const arrowLeft = document.querySelector(".fa-arrow-left");
const xmarkAdd = document.querySelector(".modalAddProject .fa-xmark");

function displayAddModal() {
  buttonAddModal.addEventListener("click", () => {
    modalAddProject.style.display = "flex";
    modalGallery.style.display = "none";
  });
  arrowLeft.addEventListener("click", () => {
    modalAddProject.style.display = "none";
    modalGallery.style.display = "flex";
  });
  xmarkAdd.addEventListener("click", () => {
    containerModals.style.display = "none";
  });
}

displayAddModal();

/*Prévisualisation de l'image avant l'ajout de celle-ci*/
const previewImg = document.querySelector(".containerFile img");
const inputFile = document.querySelector(".containerFile input");
const labelFile = document.querySelector(".containerFile label");
const inconFile = document.querySelector(".containerFile .fa-image");
const pFile = document.querySelector(".containerFile p");

/*Permet d'écouter les changements sur "l'input file"*/
inputFile.addEventListener("change", () => {
  const file = inputFile.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;
      previewImg.style.display = "flex";
      labelFile.style.display = "none";
      inconFile.style.display = "none";
      pFile.style.display = "none";
      /*Permet de régler la taille max des img importer dans la modale n°2*/
      const sizeInBytes = file.size;
      const sizeInMegabytes = sizeInBytes / (1024 * 1024);
      if (sizeInMegabytes > 4) {
        alert("Error, le fichier fait plus de 4 Mo.");
        inputFile.value = "";
        previewImg.style.display = "none";
        labelFile.style.display = "initial";
        inconFile.style.display = "flex";
        pFile.style.display = "flex";
      } else {
        alert("Success, le fichier fait moins de 4 Mo.");
      }
      /*Fin du réglage de la taille max des img importer*/
    };
    reader.readAsDataURL(file);
  }
});

/*Création d'une liste de catégories dans "l'input select" pour ajouter la catégorie correspondante*/
async function displayCategoryModal() {
  const select = document.querySelector(".modalAddProject select");
  const categorys = await getCategorys();
  categorys.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    select.appendChild(option);
  });
}
displayCategoryModal();

/*La méthode POST pour ajouter une photo à l'aide du formulaire de la modale n°2*/
const form = document.querySelector(".modalAddProject form");
const title = document.querySelector(".modalAddProject #title");
const category = document.querySelector(".modalAddProject #category");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const buttonValidForm = document.querySelector(".modalAddProject button");
  /*Appelle du Token*/
  /*Avec le swagger pour ajouter un nouveau "works"*/
  const loged = sessionStorage.getItem("token");
  const formData2 = new FormData(form);
  await fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData2,
    headers: {
      Authorization: `Bearer ${loged}` /*Pour autoriser l'ajout des "works"*/,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      displayGalleryModal();
      app();
      containerModals.style.display = "none";
      form.reset();
      previewImg.style.display = "none";
      labelFile.style.display = "initial";
      inconFile.style.display = "flex";
      pFile.style.display = "flex";
      buttonValidForm.disabled = true;
      buttonValidForm.classList.remove("valid");
      /*Ajout de la photo*/
    });
});

/*Fonction qui vérifie si tout les inputs sont remplis*/
function formValidateSuccessfully() {
  const buttonValidForm = document.querySelector(".modalAddProject button");
  const form = document.querySelector(".modalAddProject form");
  const title = document.querySelector(".modalAddProject #title");
  const category = document.querySelector(".modalAddProject #category");
  const inputFile = document.querySelector(".containerFile input");
  /*Message erreur lorsque le formulaire n'est pas correctement rempli*/
  const errorFormulaire = document.querySelector(".add_picture_error");

  form.addEventListener("input", () => {
    if (title.value !== "" && category.value !== "" && inputFile.value !== "") {
      /*La fonction "disabled" empêche la photo d'être ajouter si le formulaire n'est pas rempli correctement*/
      buttonValidForm.classList.add("valid");
      buttonValidForm.disabled = false;
      /*Disparition du message erreur lorsque le formulaire est correctement rempli*/
      errorFormulaire.style.display = "none";
    } else {
      buttonValidForm.classList.remove("valid");
      buttonValidForm.disabled = true;
      /* Apparition du message erreur lorsque le formulaire n'est pas correctement rempli*/
      errorFormulaire.textContent =
        "Erreur, le formulaire n’est pas correctement rempli";
      title.classList.add("input_error_login");
      errorFormulaire.style.display = "flex";
    }
  });
}
formValidateSuccessfully();

/**Fin du code Johan**/
