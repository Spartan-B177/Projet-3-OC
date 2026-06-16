const response = await fetch("http://localhost:5678/api/works")
const works = await response.json();


function genererWorks(works) {
    for (let i = 0; i < works.length; i++) {
        const figure = document.createElement("article");
        figure.id = "article" + i
      
        const figureImage = document.createElement("img");
        figureImage.src = works[i].imageUrl;

        const figureTitre = document.createElement("p");
        figureTitre.innerText = works[i].title;


        figure.appendChild(figureImage);
        figure.appendChild(figureTitre);
        
        const gallery = document.querySelector(".gallery");
        gallery.appendChild(figure);

    };
}

genererWorks(works);


// A REVOIR

async function getCategories() {
    const responseCategories = await fetch("http://localhost:5678/api/categories")
    const categories = await responseCategories.json();

    for (let i = 0; i < categories.length; i++) {
        const photoCategory = document.getElementById("photo-category")
        const photoCategoryOption = document.createElement("option")

        photoCategoryOption.value = categories[i].id;
        photoCategoryOption.innerText = categories[i].name

        photoCategory.appendChild(photoCategoryOption)
    }
};


getCategories()

// Vérification champs

function verifyForm(formulaire) {
    if (formulaire.value === "") {
        formulaire.classList.add("error")
    } else {
        formulaire.classList.remove("error")
    }
}

// Filtres

const filtres = document.querySelector(".filtres")


// Filtre Tous

const boutonTous = document.createElement("button");
boutonTous.classList.add("btn-tous");
boutonTous.innerText = "Tous";
boutonTous.addEventListener("click", () => {
    const toutesFigures = Array.from(works);
    toutesFigures.sort(function (a, b) {
        return a.id - b.id
    })
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(toutesFigures);
});

filtres.appendChild(boutonTous)

// Filtres Objets

const boutonObjets = document.createElement("button")
boutonObjets.classList.add("btn-objets")
boutonObjets.innerHTML = "Objets";
boutonObjets.addEventListener("click", () => {
    const figuresObjets = works.filter(function (work) {
        return work.categoryId === 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(figuresObjets)

});

filtres.appendChild(boutonObjets)

// Filtres Appartements

const boutonAppartements = document.createElement("button")
boutonAppartements.classList.add("btn-appartements")
boutonAppartements.innerText = "Appartements"
boutonAppartements.addEventListener("click", () => {
    const figuresAppartements = works.filter(function (work) {
        return work.categoryId === 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(figuresAppartements)

});

filtres.appendChild(boutonAppartements)

// Filtres Restaurants

const boutonHotelsRestaurants = document.createElement("button")
boutonHotelsRestaurants.classList.add("btn-hotels-restaurants")
boutonHotelsRestaurants.innerText = "Hotels & Restaurants"
boutonHotelsRestaurants.addEventListener("click", () => {
    const figuresHotelsRestaurants = works.filter(function (work) {
        return work.categoryId === 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(figuresHotelsRestaurants)

});

filtres.appendChild(boutonHotelsRestaurants)

// Login

if (window.localStorage.getItem("token") !== null) {

    const logout = document.getElementById("login");

    logout.innerText = "logout";
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

    // Bouton Modifier Projets

    const modifierIcon = document.createElement("i")
    modifierIcon.classList.add("fa-regular", "fa-pen-to-square")
    const modifierProjets = document.createElement("a");
    modifierProjets.classList.add("modal-trigger")
    modifierProjets.innerText = "modifier"
    modifierProjets.href = "#"

    mesProjets.appendChild(modifierIcon)
    mesProjets.appendChild(modifierProjets)

    // Galerie Photo

    const buttonAjouterPhoto = document.querySelector(".modal-2")
    buttonAjouterPhoto.classList.add("modal-trigger")
    buttonAjouterPhoto.addEventListener("click", () => {
        activerModal2()
    })


    function genererModalWorks(works) {
        for (let i = 0; i < works.length; i++) {
            const modalPics = document.querySelector(".modal-pics");

            const modalImage = document.createElement("img");
            modalImage.src = works[i].imageUrl;
            modalImage.id = i

            const modalImageSuppr = document.createElement("button")
            modalImageSuppr.classList.add("modal-image-suppr", "fa-solid", "fa-trash-can")
            modalImageSuppr.id = i
            

            modalImageSuppr.addEventListener("click", () => {
                deleteWorks(works[i].id)
                let deleteArticle = document.getElementById("article" + i)

                let gallery = document.querySelector(".gallery")
                gallery.removeChild(deleteArticle)

                modalPics.removeChild(modalImage)
                modalPics.removeChild(modalImageSuppr)

            })

            modalPics.appendChild(modalImage);
            modalPics.appendChild(modalImageSuppr);
            
        }
    }

    genererModalWorks(works)

    const chargeUtile = JSON.stringify(works)

    //Fenetre modale 1 (Supprimer Travaux)

    const modalBox = document.querySelector(".modal-box");
    const modalTriggers = document.querySelectorAll(".modal-trigger");

    modalTriggers.forEach(trigger => trigger.addEventListener("click", activerModal))

    function activerModal() {
        modalBox.classList.toggle("active");
    }

    // Requete Suppression Travaux

    async function deleteWorks(id) {
        const response = await fetch("http://localhost:5678/api/works/" + id, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem("token")}`
            },
        })
    }


    // Fenetre modale 2 (Ajout photos)

    const modalBox2 = document.querySelector(".modal-box-2");
    const modalTriggers2 = document.querySelectorAll(".modal-trigger-2");

    modalTriggers2.forEach(trigger => trigger.addEventListener("click", activerModal2))

    function activerModal2() {
        modalBox.classList.remove("active");
        modalBox2.classList.toggle("active");
    }

    let photoForm = document.getElementById("photo-form");
    let photoPreview = document.getElementById("photo-preview");

    let photoLabel = document.getElementById("photo-label");
    let photoFile = document.getElementById("photo-file");
    let photoWarning = document.getElementById("photo-warning");
    
    photoForm.addEventListener("change", (event) => {
        let filePreview = event.target.files[0];
        let url = URL.createObjectURL(filePreview);
        photoLabel.classList.add("hide-element");
        photoFile.classList.add("hide-element");
        photoWarning.classList.add("hide-element");
        photoPreview.src = url;
    })
    

    let photoTitle = document.getElementById("photo-title")
    
    photoTitle.addEventListener("change", () => {
        verifyForm(photoTitle)
    })

    function ajouterWorks() {
        const envoyerPhoto = document.getElementById("photo-form")
        envoyerPhoto.addEventListener("submit", (event) => {
            event.preventDefault()
            activerModal2()
             const formData = new FormData()
                  formData.append("title", event.target.querySelector("[name=photo-title]").value);
                  formData.append("category", event.target.querySelector("[name=photo-category]").value);
                  formData.append("image", document.getElementById("photo-file").files[0]);

            fetch("http://localhost:5678/api/works", {
                method: "POST",
                body: formData,
                headers:  { 
                    "Authorization": `Bearer ${window.localStorage.getItem("token")}`
                },
            }).then(response => response.json())
                .then(data => {  
                  const figure = document.createElement("article");
                    figure.id = "article" + works.length + 1
                        
                    const figureImage = document.createElement("img");
                    figureImage.src = data.imageUrl;
                        
                    const figureTitre = document.createElement("p");
                    figureTitre.innerText = event.target.querySelector("[name=photo-title]").value;
                        
                        
                    figure.appendChild(figureImage);
                    figure.appendChild(figureTitre);
                        
                    const gallery = document.querySelector(".gallery");
                    gallery.appendChild(figure);
                })
                .catch(error => {
                  // callback d'erreur
                  console.error(error);
                });;

            
        })

    }  
    ajouterWorks()
}