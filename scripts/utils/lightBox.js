function displayLbModal() {
    const lbModal = document.getElementById("lightbox_modal");
    lbModal.style.display = "flex";
}
function hideLbModal() {
    const lbModal = document.getElementById("lightbox_modal");
    lbModal.style.display = "none";
}

const closeButton = document.querySelector('#lbCloseBtn')
closeButton.addEventListener('click', hideLbModal)
document.addEventListener('keydown', (event) => {
    if (event.key === "Escape" && document.getElementById("lightbox_modal").style.display !== "none") {
        hideLbModal();
    }
})

export {hideLbModal, displayLbModal}