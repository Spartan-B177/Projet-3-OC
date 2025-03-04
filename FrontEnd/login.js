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
    console.log(chargeUtile)

    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: chargeUtile
    }); console.log(response)
    if (response.status === 200) {
        const data = await response.json()
        console.log(data.token)
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
console.log(msgError);
}

function removeMessageErreur() {
    const removeMsgError = document.querySelector(".msgError");
    removeMsgError.innerText = ""
    console.log(removeMsgError)
}


ajoutListenerLogin()