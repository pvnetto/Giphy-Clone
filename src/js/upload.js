// TODO: Handle file browsing
const fileInput = document.querySelector('[type=file]');
fileInput.addEventListener('input', HandleFileSelection);

const uploadModal = document.getElementById('upload_modal');
const modalBody = uploadModal.querySelector('modal-body');
console.log(uploadModal);

$('#upload_modal').modal('show');

function HandleFileSelection(e) {
    $('#upload_modal').modal('show');

    console.log(this.files);
    for (let i = 0; i < this.files.length; i++) {
        let path = (window.URL || window.webkitURL).createObjectURL(this.files[i]);

        let modalImg = uploadModal.querySelector('img');
        modalImg.src = path;
    }
}

// TODO: Handle file drop