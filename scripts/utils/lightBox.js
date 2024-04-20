function displayLbModal() {
    const lbModal = document.getElementById("lightbox_modal");
    const mainContent = document.querySelector('main');
    const header = document.querySelector('header');
    lbModal.style.display = "flex";
    mainContent.style.display = "none"
    header.style.display = "none"
    
}
function hideLbModal() {
    const lbModal = document.getElementById("lightbox_modal");
    const mainContent = document.querySelector('main');
    const header = document.querySelector('header');
    lbModal.style.display = "none";
    mainContent.style.display = "block"
    header.style.display = "block"
}

const closeButton = document.querySelector('#lbCloseBtn')
closeButton.addEventListener('click', hideLbModal)
closeButton.addEventListener('keydown', (event) => {
    if (event.key === "Enter" || event.code === "Space") {
        event.preventDefault();
        hideLbModal();
    }
})
document.addEventListener('keydown', (event) => {
    if (event.key === "Escape" && document.getElementById("lightbox_modal").style.display !== "none") {
        hideLbModal();
    }
})

export {hideLbModal, displayLbModal}