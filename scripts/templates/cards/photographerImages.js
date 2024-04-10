export default class PhotographerImages {
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.image = data.image;
    this.date = data.date;
    this.likes = data.likes;
    this.initialLikes = data.likes
  }

  render() {
    const mediaContainer = document.createElement("div");
    mediaContainer.classList.add("mediaContainer", "imageContainer");
    const template = `<img src="assets/images/${this.photographerId}/${this.image}" alt="${this.title}" class="card__media" data-id="${this.id}" data-title="${this.title}" data-likes="${this.likes}" data-date="${this.date}">
    <div class="mediaInfo"><span class="mediaTitle">${this.title}</span><div class="mediaLikes"><span>${this.likes}</span><image class="mediaLikeButton" id="content-${this.id}" src="../../assets/icons/favorite-red.svg"/></div></div>`;
    mediaContainer.innerHTML = template;
    return mediaContainer;
  }
  lightboxRender() {
    const mediaContainer = document.createElement("div");
    mediaContainer.classList.add("mediaContainer");
    const imageTitle = document.querySelector(".Imgtitle");
    imageTitle.innerHTML = this.title;
    const template = `<img src="assets/images/${this.photographerId}/${this.image}" alt="${this.title}" class="card__media" data-id="${this.id}" data-title="${this.title}" data-likes="${this.likes}" data-date="${this.date}">`;
    mediaContainer.innerHTML = template;
    return mediaContainer;
  }
  toggleLike() {
    if (this.likes > this.initialLikes) {
      this.likes--;
    } else {
      this.likes++;
    }
  }
  getLikes() {
    return this.likes;
  }
}
