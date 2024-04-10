import Media from "../templates/cards/Media.js";
import { displayLbModal, hideLbModal } from "../utils/lightBox.js";
import { sortPhotographerPage } from "../utils/sortPhotographerPage.js";

const sortFilter = document.querySelector("#sort-filter");
const params = await new URL(document.location).searchParams;
const photographerId = parseInt(params.get("id"));
const photographer = await getPhotographerData(parseInt(photographerId));
const media = await getPhotographerMedia(parseInt(photographerId));

var totalArtistLikes;
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

sortFilter.addEventListener("change", (event) => {
  switch (event.target.value) {
    case "popularité":
      displayMedia(media, "Popularité");
      console.log("popularité")
      break;
    case "date":
      displayMedia(media, "Date");
      console.log("date")
      break;
    case "titre":
      displayMedia(media, "Titre");
      console.log("titre")
      break;
  }
});

async function getPhotographerMedia(id) {
  let mediaData = await fetch("data/photographers.json").then((response) =>
    response.json()
  );
  let media = mediaData.media.filter((media) => media.photographerId === id);
  return media;
}

async function displayData(photographer) {
  const picture = `assets/photographers/${photographer.portrait}`;
  const photographerHeader = document.querySelector(".photograph-header");
  const mainContainer = document.querySelector("#main");
  const informationDiv = document.createElement("div");
  informationDiv.classList.add("photograph-informations");
  photographerHeader.appendChild(informationDiv);
  const img = document.createElement("img");
  img.setAttribute("src", picture);
  img.setAttribute(
    "alt",
    `${photographer.name.toLowerCase().replace(" ", "-")}-profile-picture`
  );
  img.setAttribute(
    "aria-label",
    `${photographer.name.toLowerCase().replace(" ", "-")}-profile-picture`
  );

  const h2 = document.createElement("h2");
  h2.textContent = photographer.name;

  const location = document.createElement("p");
  location.innerText = `${photographer.city}, ${photographer.country}`;
  location.classList.add("location");

  const tagLine = document.createElement("p");
  tagLine.innerText = photographer.tagline;
  tagLine.classList.add("tagline");

  const priceDiv = document.createElement("div");
  priceDiv.classList.add("priceContainer");
  const price = document.createElement("p");
  price.innerText = `${photographer.price}€/jour`;

  priceDiv.appendChild(price);

  photographerHeader.appendChild(img);
  informationDiv.appendChild(h2);
  informationDiv.appendChild(location);
  informationDiv.appendChild(tagLine);
  mainContainer.appendChild(priceDiv);
}

async function displayMedia(photographerMedia, sortType) {
  const mediaSection = document.querySelector(".mediaSection");
  mediaSection.innerHTML = "";
  sortPhotographerPage(photographerMedia, sortType);
  photographerMedia.forEach((media) => {
    const RenderedMedia = new Media(media);
    mediaSection.appendChild(RenderedMedia.render());
    const likeButton = document.querySelector(`#content-${media.id}`);
    const likeCount = document.querySelector(
      `#content-${media.id}`
    ).previousElementSibling;
    likeButton.addEventListener("click", () => {
      RenderedMedia.toggleLike();
      likeCount.innerText = RenderedMedia.getLikes();
      displayLikes();
    });
  });
}

async function displayLightBox(photographerMedias) {
  const mediaContainers = document.querySelectorAll(".mediaContainer");
  const mediaNavContainer = document.querySelector("#mediaNavContainer");
  const modal = document
    .querySelector("#lightbox_modal")
    .querySelector(".modal");
  const prevImageBtn = modal.querySelector(".prevImage");
  const nextImageBtn = modal.querySelector(".nextImage");
  mediaContainers.forEach((mediaContainer) => {
    const mediaContent = mediaContainer.querySelector(".card__media");
    mediaContent.addEventListener("click", () => {
      const prevImages = mediaNavContainer.querySelector(".mediaContainer");
      if (prevImages) {
        mediaNavContainer.removeChild(prevImages);
      }
      const clickedImage = mediaContainer.firstChild.getAttribute("data-id");
      const extractClickData = photographerMedias.find(
        (value) => value.id === parseInt(clickedImage)
      );
      const RenderedMedia = new Media(extractClickData);
      mediaNavContainer.appendChild(RenderedMedia.lightboxRender());
      displayLbModal();
    });
  });

  nextImageBtn.addEventListener("click", () => {
    const currentImage = modal.querySelector(".mediaContainer");
    const currentImageId = currentImage.firstChild.getAttribute("data-id");
    const imagePos = photographerMedias.indexOf(
      photographerMedias.find((value) => value.id === parseInt(currentImageId))
    );
    const nextImageId =
      imagePos == photographerMedias.length - 1
        ? photographerMedias[0].id
        : photographerMedias[imagePos + 1].id;
    const extractNextData = photographerMedias.find(
      (value) => value.id === parseInt(nextImageId)
    );
    const RenderedMedia = new Media(extractNextData);
    mediaNavContainer.removeChild(currentImage);
    mediaNavContainer.appendChild(RenderedMedia.lightboxRender());
  });

  prevImageBtn.addEventListener("click", () => {
    const currentImage = modal.querySelector(".mediaContainer");
    const currentImageId = currentImage.firstChild.getAttribute("data-id");
    const imagePos = photographerMedias.indexOf(
      photographerMedias.find((value) => value.id === parseInt(currentImageId))
    );
    const prevImageId =
      imagePos == 0
        ? photographerMedias[photographerMedias.length - 1].id
        : photographerMedias[imagePos - 1].id;
    const extractprevData = photographerMedias.find(
      (value) => value.id === parseInt(prevImageId)
    );
    const RenderedMedia = new Media(extractprevData);
    mediaNavContainer.removeChild(currentImage);
    mediaNavContainer.appendChild(RenderedMedia.lightboxRender());
  });
}

async function displayLikes() {
  const favSelector = document.querySelector(".favorites");
  const priceDiv = document.querySelector(".priceContainer");
  if (favSelector) {
    priceDiv.removeChild(priceDiv.lastElementChild);
  }
  let returnedTotalLikes = 0;

  document
    .querySelectorAll(".mediaLikes span")
    .forEach((like) => (returnedTotalLikes += parseInt(like.innerText)));

  const favorites = document.createElement("p");
  favorites.classList.add("favorites");
  favorites.innerText = returnedTotalLikes;
  priceDiv.appendChild(favorites);
}

async function init() {
  displayData(photographer);
  displayMedia(media, "Popularité");
  displayLightBox(media);
  displayLikes();
}

init();

export { getPhotographerData, displayLightBox };
