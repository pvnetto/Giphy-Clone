import uploadItemHTML from '../components/upload_item.txt';
import { uploadFile } from './components/giphy';

// TODO: Handle file browsing
const fileInput = document.querySelector('[type=file]');
fileInput.addEventListener('input', HandleFileSelection);

const uploadModal = document.getElementById('upload_modal');
const uploadDropArea = document.getElementById('upload_drop');
const uploadModalBody = uploadModal.querySelector('modal-body');
const uploadModalTags = document.getElementById('upload_tags');
const uploadModalSrc = document.getElementById('upload_source');
const uploadBtn = document.getElementById('upload_btn');
const uploadContainer = uploadModal.querySelector('.modal-upload-container');


let selectedFiles = [];
let uploadItems = [];
let numItems = 0;

uploadDropArea.addEventListener('drop', HandleFileDrop);
uploadDropArea.addEventListener('dragover', HandleDrag);

uploadBtn.addEventListener('click', UploadItems);

function HandleDrag(e) {
    e.preventDefault();
}

function HandleFileSelection(e) {
    UpdateUploadModal(this.files);
}

function HandleFileDrop(e) {
    e.preventDefault();
    UpdateUploadModal(e.dataTransfer.files);
}

function UpdateUploadModal(files) {
    $('#upload_modal').modal('show');

    selectedFiles = [];
    uploadItems = [];
    numItems = 0;

    let filesFragment = document.createDocumentFragment();
    for (let i = 0; i < files.length; i++) {
        let path = (window.URL || window.webkitURL).createObjectURL(files[i]);
        selectedFiles.push(files[i]);

        let uploadItem = document.createElement('div');
        uploadItem.innerHTML = uploadItemHTML;

        let uploadImg = uploadItem.querySelector('img');
        uploadImg.src = path;

        let uploadTitle = uploadItem.querySelector('p');
        uploadTitle.textContent = files[i].name;

        let uploadDeleteBtn = uploadItem.querySelector('button');
        uploadDeleteBtn.addEventListener('click', () => {
            selectedFiles[i] = undefined;
            uploadItems[i].style.setProperty('display', 'none');
            numItems--;

            if (numItems == 0) {
                $('#upload_modal').modal('hide');
            }
        });

        filesFragment.appendChild(uploadItem);
        uploadItems.push(uploadItem);
    }

    numItems = files.length;
    uploadContainer.appendChild(filesFragment);
}

async function UploadItems() {
    let fileToUpload = selectedFiles[0];
    let tags = uploadModalTags.value.split(',');
    tags = tags.map(tag => tag.trim(' '));
    tags = tags.join(',');
    let sourceTxt = uploadModalSrc.value;

    console.log("Uploading: ", fileToUpload);
    console.log("Tags: ", tags);
    console.log("Source: ", sourceTxt);

    var preview = document.querySelector('.preview');
    // var file    = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function () {
        var base64gif = reader.result; // your gif in base64 here
        uploadFile(base64gif, tags, sourceTxt);
        // preview.src = base64gif;
        // document.getElementById('base64').innerHTML = base64gif;
    }, false);

    if (fileToUpload) {
        reader.readAsBinaryString(fileToUpload);
    }

    // giphy.UploadItem(fileToUpload, tags, sourceTxt);
}
