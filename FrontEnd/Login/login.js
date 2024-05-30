/*Début du code Johan*/

/*Login pour les Users*/
const email = document.querySelector("form #email");
const password = document.querySelector("form #password");
const form = document.querySelector("form");
const messageErreur = document.querySelector(".connection p");

/*Connexion des Users*/
async function login() {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const reponse = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    const data = await reponse.json();
    sessionStorage.setItem("token", data.token);
    sessionStorage.getItem("token");
    /*Login pour se connecté avec e-mail, mdps et token */
    const token = sessionStorage.getItem("token");
    window.sessionStorage.loged = "token";
    if (sessionStorage.getItem("token") != "undefined") {
      window.sessionStorage.loged = true;
      window.location.href = "../index.html";
    } else {
      email.classList.add("input_error_login");
      password.classList.add("input_error_login");
      messageErreur.textContent = "Error email or password";
    }
  });
}
login();

/*Fin du code Johan*/
