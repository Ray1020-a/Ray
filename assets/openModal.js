function openModal(num) {
    const modalBackground = document.getElementById('modal' + num);
    const modalContent = modalBackground.querySelector('.modal-content');
    modalBackground.classList.add('active');
    modalContent.classList.add('active');

    modalBackground.addEventListener('click', function(event) {
        if (event.target === modalBackground) {
            closeModal(num);
        }
    });

    document.addEventListener('keydown', function(event) {
        closeModal(num);
    }, { once: true });
}

function closeModal(num) {
    const modalBackground = document.getElementById('modal' + num);
    const modalContent = modalBackground.querySelector('.modal-content');
    modalContent.classList.remove('active');

    setTimeout(() => {
        modalBackground.classList.remove('active');
    }, 300);
}
