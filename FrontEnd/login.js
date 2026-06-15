const login = document.getElementById("login");
const champEmail = document.getElementById("email")
const champPassword = document.getElementById("password")

export async function ajoutListenerLogin() {
    
    
    login.addEventListener("submit", async function (event) {
    event.preventDefault();
    
    const user = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value,
    };
    
    const chargeUtile = JSON.stringify(user);

    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: chargeUtile
    });
    if (response.status === 200) {
        const data = await response.json()
        localStorage.setItem("token", data.token)
        window.location.href = "index.html"
        
    } else {
        messageErreur()
    }
    });
}

async function messageErreur() {
    const msgError = document.querySelector(".msgError");
msgError.innerText = "Identifiant ou mot de passe erroné.";
}

function verifyLogin(formulaire) {
    if (formulaire.value === "") {
        formulaire.classList.add("error")
    } else {
        formulaire.classList.remove("error")
    }
}

champEmail.addEventListener("change", () => {
    verifyLogin(champEmail)
})

champPassword.addEventListener("change", () => {
    verifyLogin(champPassword)
})

ajoutListenerLogin()