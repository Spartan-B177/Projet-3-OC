export async function ajoutListenerLogin() {
    
    const login = document.getElementById("login");
    login.addEventListener("submit", async function (event) {
        removeMessageErreur()
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

function messageErreur() {
    const msgError = document.querySelector(".msgError");
msgError.innerText = "Mauvais mot de passe";
}

function removeMessageErreur() {
    const removeMsgError = document.querySelector(".msgError");
    removeMsgError.innerText = ""
}


ajoutListenerLogin()