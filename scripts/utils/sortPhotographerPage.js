export function sortPhotographerPage(media, sort) {
  switch (sort) {
    case "Popularité":
      media.sort((a, b) => b.likes - a.likes);
      break;
    case "Date":
      media.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      break;
    case "Titre":
      media.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      media.sort((a, b) => b.likes - a.likes);
  }
}
