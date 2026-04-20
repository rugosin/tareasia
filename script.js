const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const dropArea = document.getElementById('dropArea');
const previewImage = document.getElementById('previewImage');

const defaultImageUrl = 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80';

function setPreviewImage(src, altText) {
  previewImage.src = src;
  previewImage.alt = altText;
}

function handleFiles(files) {
  if (!files.length) {
    return;
  }

  const file = files[0];
  if (!file.type.startsWith('image/')) {
    alert('Por favor selecciona un archivo de imagen válido.');
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    setPreviewImage(event.target.result, 'Foto subida del Schnauzer');
  };
  reader.readAsDataURL(file);
}

uploadButton.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (event) => {
  handleFiles(event.target.files);
});

['dragenter', 'dragover'].forEach((eventName) => {
  dropArea.addEventListener(eventName, (event) => {
    event.preventDefault();
    event.stopPropagation();
    dropArea.classList.add('dragover');
  });
});

['dragleave', 'drop'].forEach((eventName) => {
  dropArea.addEventListener(eventName, (event) => {
    event.preventDefault();
    event.stopPropagation();
    dropArea.classList.remove('dragover');
  });
});

dropArea.addEventListener('drop', (event) => {
  if (event.dataTransfer?.files) {
    handleFiles(event.dataTransfer.files);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  setPreviewImage(defaultImageUrl, 'Ejemplo de Schnauzer');
});
