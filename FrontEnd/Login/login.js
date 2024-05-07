/*Début du code Johan*/

/*Login pour les Users*/
const email = document.querySelector("form #email");
const password = document.querySelector("form #password");
const form = document.querySelector("form");
const messageErreur = document.querySelector(".connection p");

/*Connexion des Users*/
async function login() {
  console.log(form);
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("login");
    console.log(email.value);
    console.log(password.value);
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
    console.log(data);
    sessionStorage.setItem("token", data.token);
    sessionStorage.getItem("token");
    console.log(sessionStorage.getItem("token"));
    /*Login pour se connecté avec e-mail, mdps et token */
    const token = sessionStorage.getItem("token");
    window.sessionStorage.loged = "token";
    if (sessionStorage.getItem("token") != "undefined") {
      window.sessionStorage.loged = true;
      window.location.href = "../index.html";
      console.log("ok");
      console.log(sessionStorage.getItem("token"));
    } else {
      email.classList.add("input_error_login");
      console.log(password.classList.add("input_error_login"));
      password.classList.add("input_error_login");
      console.log(password.classList.add("input_error_login"));
      messageErreur.textContent = "Error email or password";
      console.log("error");
    }
  });
}
login();

/*Fin du code Johan*/
