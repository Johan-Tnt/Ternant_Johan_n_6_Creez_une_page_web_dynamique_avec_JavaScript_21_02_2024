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
  console.log(figure);
  console.log(img);
  console.log(popUp);
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

/**Code du Login**/
/*Lorsque l'utilisateur est connecté*/
const loged = localStorage.getItem("token");
const admin = document.querySelector(".admin");
const logout = document.querySelector(".logout");
console.log(admin);

if (loged != "undefined") {
  /*Fait apparaître le mot "logout" et permet de déconnecter l'admin*/
  logout.textContent = "logout";
  logout.addEventListener("click", () => {
    localStorage.setItem("token", undefined);
  });
  /*Permet de faire disparaitre les boutons "filtres*/
  filters.style.display = "none";
}

/**Code de la modal n°1**/
/*Au click sur le btn "Modifier" affichage des modals lorsque l'on est Administrateur*/
const containerModals = document.querySelector(".containerModals");
const xmark = document.querySelector(".containerModals .fa-xmark");
const pictureModal = document.querySelector(".pictureModal");
const buttonModal = document.querySelector(".button_modal");

function manageDisplayModalGallery(params) {
  /*Fonction qui gère l'affichage de "modifier" lorsque que l'admin est connecté*/
  if (loged != "undefined") {
    buttonModal.style.display = "flex";
    /*Fonction qui gère l'affichage de la modale au click sur "modifier"*/
    const buttonModification = document.querySelectorAll(".button_modal");
    console.log(buttonModification);
    buttonModification.forEach((button) => {
      button.addEventListener("click", (e) => {
        console.log("boutton");
        containerModals.style.display = "flex";
      });
    });
  }
  /*Gère la fermeture de la modal sur la croix*/
  xmark.addEventListener("click", () => {
    console.log("xmark");
    containerModals.style.display = "none";
  });
  /*Gère la fermeture sur le container en dehors*/
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
  deleteProject(); /*Fonction qui permet de supprimé une image*/
}
displayGalleryModal();

/*Suppression d'une image avec la méthode "delete" pour la modal n°1*/
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
            console.log("la supression n'a pas fonctionné !");
          }
          return response /*.json()*/;
          /*Echec de la supression de la photo*/
        })
        .then((data) => {
          console.log("La supression a fonctionné voici la data :", data);
          displayGalleryModal();
          app();
          /*Supression de la photo réussie*/
        });
    });
  });
}

/**Code de la modal n°2**/
/*Fait apparaître la deuxième modal une fois le html terminer*/
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
  console.log(file);
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;
      previewImg.style.display = "flex";
      labelFile.style.display = "none";
      inconFile.style.display = "none";
      pFile.style.display = "none";
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

/*La méthode POST pour ajouter une photo à l'aide du formulaire de la modal n°2*/
const form = document.querySelector(".modalAddProject form");
const title = document.querySelector(".modalAddProject #title");
const category = document.querySelector(".modalAddProject #category");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const buttonValidForm = document.querySelector(".modalAddProject button");
  /*Appelle du Token*/
  /*Avec le swagger pour ajouter un nouveau "works"*/
  const loged = localStorage.getItem("token");
  console.log(loged);
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
      console.log(data);
      console.log("la photo a été ajouté", data);
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
    })
    .catch((error) =>
      console.log("erreur, la photo n'a pas été ajouté", error)
    );
  /*Erreur photo non ajoutée*/
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
