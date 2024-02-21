    //Mettre le code JavaScript lié à la page photographer.html
    async function getPhotographerData(id) {
    let photographerData = await fetch("data/photographers.json").then(
        (response) => response.json()
    );
    let photographer = photographerData.photographers.find(
        (photographer) => photographer.id === id
    );
    return photographer;
    }

    async function displayData(photographer) {
        const picture = `assets/photographers/${photographer.portrait}`;
        const photographerHeader = document.querySelector(".photograph-header");
        const photographerInformation = document.querySelector(
            ".photograph-informations"
        );
        console.log("photographer => ", photographer);
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", `${photographer.name.toLowerCase().replace(" ", "-")}-profile-picture`)
        img.setAttribute("aria-label", `${photographer.name.toLowerCase().replace(" ", "-")}-profile-picture`)

        const h2 = document.createElement("h2");
        h2.textContent = photographer.name;

        const location = document.createElement("p");
        location.innerText = `${photographer.city}, ${photographer.country}`;
        location.classList.add("location");

        const tagLine = document.createElement("p");
        tagLine.innerText = photographer.tagline;
        tagLine.classList.add("tagline");

        photographerHeader.appendChild(img);
        photographerInformation.appendChild(h2);
        photographerInformation.appendChild(location);
        photographerInformation.appendChild(tagLine);
    }

    async function init() {
    const params = await new URL(document.location).searchParams;
    const photographerId = parseInt(params.get("id"));
    const photographer = await getPhotographerData(parseInt(photographerId));
    displayData(photographer);
    }

    init();
