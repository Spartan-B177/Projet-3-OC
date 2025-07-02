const response = await fetch("http://localhost:5678/api/works")
const works = await response.json();


function genererWorks(works){
    for (let i = 0; i < works.length; i++){
        const figure = document.createElement("article");
    
        const gallery = document.querySelector(".gallery");
        gallery.appendChild(figure);
    
        const figureImage = document.createElement("img");
        figureImage.src = works[i].imageUrl;
    
        const figureTitre = document.createElement("p");
        figureTitre.innerText = works[i].title;
    
      
        figure.appendChild(figureImage);
        figure.appendChild(figureTitre);
    };
}

genererWorks(works);


const boutonTous = document.querySelector(".btn-tous");

boutonTous.addEventListener("click", () => {
    const toutesFigures = Array.from(works);
    toutesFigures.sort(function(a, b) {
        return a.id - b.id
    })
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(toutesFigures);
    console.log(toutesFigures);
});

const boutonObjets = document.querySelector(".btn-objets")

boutonObjets.addEventListener("click", () => {
    const figuresObjets = works.filter(function (work) {
        return work.categoryId === 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(figuresObjets)
    console.log(figuresObjets)
    
});

const boutonAppartements = document.querySelector(".btn-appartements")

boutonAppartements.addEventListener("click", () => {
    const figuresAppartements = works.filter(function (work) {
        return work.categoryId === 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(figuresAppartements)
    console.log(figuresAppartements)
    
});

const boutonHotelsRestaurants = document.querySelector(".btn-hotels-restaurants")

boutonHotelsRestaurants.addEventListener("click", () => {
    const figuresHotelsRestaurants = works.filter(function (work) {
        return work.categoryId === 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(figuresHotelsRestaurants)
    console.log(figuresHotelsRestaurants)
    
});

if (window.localStorage.getItem("token") !== null) {
    console.log("Vous etes connecté !")

    const logout = document.querySelector(".login");

    logout.innerText = "Logout";
    logout.href = "index.html";
    logout.addEventListener("click", () => {
        window.localStorage.removeItem("token")
    });

    const body = document.getElementById("body")
    const modeEdition = document.createElement("div")
    modeEdition.classList.add("edition")

    const modeEditionText = document.createElement("p")
    modeEditionText.innerText = "Mode Edition"

    const modeEditionIcon = document.createElement("i")
    modeEditionIcon.classList.add("fa-regular", "fa-pen-to-square")

    modeEdition.appendChild(modeEditionIcon)
    modeEdition.appendChild(modeEditionText)
    body.prepend(modeEdition)

    const filtresProjets = document.querySelector(".filtres")
    filtresProjets.innerHTML = " "

    const mesProjets = document.querySelector(".projets-box");

    const modifierIcon = document.createElement("i")
    modifierIcon.classList.add("fa-regular", "fa-pen-to-square")
    const modifierProjets = document.createElement("a");
    modifierProjets.classList.add("modal-trigger")
    modifierProjets.innerText = "modifier"
    modifierProjets.href = "#"
    
    mesProjets.appendChild(modifierIcon)
    mesProjets.appendChild(modifierProjets)

    const modalBox = document.querySelector(".modal-box");
    const modalTriggers = document.querySelectorAll(".modal-trigger");

    modalTriggers.forEach(trigger => trigger.addEventListener("click", activerModal))

    function activerModal(){
        modalBox.classList.toggle("active")
    }

    const ajouterPhoto = document.querySelector(".modal-2")
    ajouterPhoto.classList.add("modal-trigger")
    ajouterPhoto.addEventListener("click", () => {
        
    })

      /* Fenêtres modales et suppression des travaux*/
    
    function genererModalPics(works){
        for (let i = 0; i < works.length; i++){
            const modalPics = document.querySelector(".modal-pics");

            const modalImage = document.createElement("img");
            modalImage.src = works[i].imageUrl;

            const modalImageSuppr = document.createElement("button") 
            modalImageSuppr.classList.add("modal-image-suppr", "fa-regular", "fa-trash-can")         

            
            
            modalImageSuppr.addEventListener("click",() =>{
                deleteWorks(works[i].id)
                console.log(works)
            })
            
            modalPics.appendChild(modalImage)
            modalPics.appendChild(modalImageSuppr)
        }
    }

    genererModalPics(works)

    const chargeUtile = JSON.stringify(works)

    async function deleteWorks(id){
        const response = await fetch("http://localhost:5678/api/works/" + id , {
        method: "DELETE",
        headers: { 
               "Authorization": `Bearer ${window.localStorage.getItem("token")}`
               
            },
        })        
    }

    function returnWorks(id){
        const response = fetch
    }
} 