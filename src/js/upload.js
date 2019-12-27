import uploadItemHTML from '../components/upload_item.txt';
import { uploadFile } from './components/giphy';


// TODO: Handle file browsing
const fileInput = document.querySelector('[type=file]');
fileInput.addEventListener('input', handleFileSelection);

const uploadModal = document.getElementById('upload_modal');
const uploadDropArea = document.getElementById('upload_drop');
const uploadModalBody = uploadModal.querySelector('.modal-body');
const uploadModalTags = document.getElementById('upload_tags');
const uploadModalSrc = document.getElementById('upload_source');
const uploadBtn = document.getElementById('upload_btn');
const uploadContainer = uploadModal.querySelector('.modal-upload-container');


let selectedFiles = [];
let uploadedItems = [];
let numItems = 0;

uploadDropArea.addEventListener('drop', handleFileDrop);
uploadDropArea.addEventListener('dragover', handleDrag);

uploadBtn.addEventListener('click', uploadItems);

function handleDrag(e) {
    e.preventDefault();
}

function handleFileSelection(e) {
    updateUploadModal(this.files);
}

function handleFileDrop(e) {
    e.preventDefault();
    updateUploadModal(e.dataTransfer.files);
}

function updateUploadModal(files) {
    $('#upload_modal').modal('show');

    clearUploadContainer();

    selectedFiles = [];
    uploadedItems = [];
    numItems = 0;

    let filesFragment = document.createDocumentFragment();
    for (let i = 0; i < files.length; i++) {
        let path = (window.URL || window.webkitURL).createObjectURL(files[i]);
        selectedFiles.push(files[i]);

        const uploadItem = createUploadItem(path, files[i]);

        const uploadDeleteBtn = uploadItem.querySelector('button');
        uploadDeleteBtn.addEventListener('click', () => {
            selectedFiles[i] = undefined;
            uploadedItems[i].style.setProperty('display', 'none');
            numItems--;

            if (numItems == 0) {
                $('#upload_modal').modal('hide');
            }
        });

        filesFragment.appendChild(uploadItem);
        uploadedItems.push(uploadItem);
    }

    numItems = files.length;
    uploadContainer.appendChild(filesFragment);
}

const createUploadItem = (path, file) => {
    let uploadItem = document.createElement('div');
    uploadItem.innerHTML = uploadItemHTML;
    uploadItem = uploadItem.querySelector('.upload-item-container');

    const uploadImg = uploadItem.querySelector('img');
    uploadImg.src = path;

    const uploadTitle = uploadItem.querySelector('p');
    uploadTitle.textContent = file.name;

    return uploadItem;
}

const clearUploadContainer = () => {
    const activeItems = uploadContainer.querySelectorAll('.upload-item-container');
    if (activeItems) {
        [...activeItems].forEach(activeItem => {
            uploadContainer.removeChild(activeItem);
        })
    }
}

async function uploadItems() {
    let fileToUpload = selectedFiles[0];
    let tags = uploadModalTags.value.split(',');
    tags = tags.map(tag => tag.trim(' '));
    tags = tags.join(',');
    let sourceTxt = uploadModalSrc.value;

    console.log("Uploading: ", fileToUpload);
    console.log("Tags: ", tags);
    console.log("Source: ", sourceTxt);

    // uploadFile(base64gif, tags, sourceTxt);
}
