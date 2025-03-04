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
} 
