function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price} = data;
    console.log("LA DAAATA => ", data)

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", `${name.toLowerCase().replace(" ", "-")}-profile-picture`)
        img.setAttribute("aria-label", `${name.toLowerCase().replace(" ", "-")}-profile-picture`)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const location = document.createElement( 'p' );
        location.innerText = `${city}, ${country}`;
        location.classList.add('location');
        const tagLine = document.createElement( 'p' );
        tagLine.innerText = tagline;
        tagLine.classList.add('tagline');
        const priceTag = document.createElement( 'p' );
        priceTag.innerText = `${price}€/jour`;
        priceTag.classList.add('price');
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(tagLine);
        article.appendChild(priceTag);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}