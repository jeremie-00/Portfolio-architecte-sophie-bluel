import { makeFetchRequest } from './modules/makeFetch.js';
import { createGallery } from './modules/galleryManager.js';
import { createFilterButtons, resteColorButton, filterCategory, categoryModal } from './modules/filterManager.js';
import { admin, createLinkLog } from './modules/logManager.js';
import { createLinkModal } from './modules/modalManager.js';
import { checkFormAjouter, validFileType, validFileSize } from './modules/checkForm.js'

import { qs, qsa, createElement, saveStorage, removeStorage, loadStorage } from './modules/domFunctions.js';

const urlWorks = "http://localhost:5678/api/works"
const curl = {
    method: 'GET',
    headers: {
        'accept': 'application/json',
    },
}

const galleries = {
    'gallery'      : qs('.gallery'),
    'galleryModal' : qs('.gallery-modal')
}

const adminDataJSON = loadStorage('admin')
const adminData = JSON.parse(adminDataJSON)

export { adminData, urlWorks, curl, galleries }

document.addEventListener('DOMContentLoaded', async function () {

    
    const urlCategories = "http://localhost:5678/api/categories"


    const itemsGallery = await makeFetchRequest(urlWorks, curl)
    const categories = await makeFetchRequest(urlCategories, curl)

    const gallery = qs('.gallery')
    const galleryModal = qs('.gallery-modal')

    createFilterButtons(categories)
    filterCategory(itemsGallery)
    categoryModal(categories)

    const linkLog = createLinkLog()

    if (admin()) {
        linkLog.addEventListener('click', () => {
            removeStorage('admin')
        })
        const banner = qs('.banner')
        banner.style.height = '59px'
    }


    const openModal = createLinkModal()

    const modal = qs('.modal')
    const closeModal = qs(".modal-close")
    const btnAjout = qs('#btn-ajout')
    const btnValider = qs('#btn-valide')
    const modal1 = qs('.content-modal-1')
    const modal2 = qs('.content-modal-2')
    const retour = qs('.modal-retour')
    const containerError = qs('.js-error')

    const formAjout = qs('#ajouter')
    const ajoutPhoto = qs('#file')
    const titleInput = qs('#title')
    const categorySelect = qs('#category')

    const imgElement = createElement('img')
    const previewDiv = qs('#imagePreview')
    const choixImage = qs('#choixImage')

    const restePreview = () => {
        ajoutPhoto.value = ''
        imgElement.src = ''
        choixImage.style.display = 'flex'
        previewDiv.innerHTML = ''
        previewDiv.style.display = 'none'
    }

    const resteInput = () => {
        titleInput.value = ''
        categorySelect.value = ''
    }

    const resteMessageError = () => containerError.innerHTML = ''

    const messageError = (message) => {
        resteMessageError()
        containerError.innerHTML = message
    }

    const resteGeneral = () => {
        restePreview()
        resteInput()
        resteMessageError()
    }

    resteGeneral()

    openModal.addEventListener("click", () => {
        modal.style.display = 'flex'
        modal.showModal()

        btnValider.disabled = true
    })

    btnAjout.addEventListener('click', () => {
        modal1.style.display = 'none'
        modal2.style.display = 'flex'
        retour.style.opacity = 1
        retour.style.cursor = 'pointer'
    })
    const retourModal1 = () => {
        modal1.style.display = 'flex'
        modal2.style.display = 'none'
        retour.style.opacity = 0
        retour.style.cursor = 'default'
        restePreview()
        resteInput()
    }
    retour.addEventListener('click', () => {
        retourModal1()
    })

    closeModal.addEventListener("click", () => {
        modal.close()
        modal.style.display = 'none'
        resteGeneral()
        retourModal1()
    })




    // function createGallery(itemsGallery, container) {

    //     while (container.firstChild) {
    //         container.removeChild(container.firstChild);
    //     }
    
    //     const fragment = document.createDocumentFragment()
    
    //     itemsGallery.forEach((item) => {
    //         const figure = createElement('figure')
    //         const img = createElement('img')
    
    //         figure.className = 'js-work'
    
    //         figure.setAttribute('data-index', item.id)
    
    //         img.src = item.imageUrl
    
    //         if (container.id === 'gallery') {
    //             const figcaption = createElement('figcaption')
    //             figcaption.innerHTML = item.title
    //             figure.append(img, figcaption)
    //         } else {
    //             const icone = createElement('i')
    //             icone.className = "fa-solid fa-trash-can fa-xs"
    //             icone.setAttribute('data-index', item.id)
    //             listenEvent(icone)
    //             figure.append(img, icone)
    //         }
    
    //         fragment.appendChild(figure)
    //     })
    
    //     container.appendChild(fragment)  
    // }

    // function listenEvent(icone) {
    //     icone.addEventListener('click', async (event) => {
    //         const trashIcon = event.target.closest('.fa-trash-can')
    
    //         if (trashIcon) {
    //             const id = trashIcon.getAttribute('data-index')
    
    //             const curlDelete = {
    //                 method: 'DELETE',
    //                 headers: {
    //                     'accept': '*/*',
    //                     'Authorization': `Bearer ${adminData.token}`
    //                 },
    //             }
    //             const deleteImage = await makeFetchRequest(urlWorks + `/${id}`, curlDelete)
    
    //             if (deleteImage) {
    //                 const itemsGallery = await makeFetchRequest(urlWorks, curl)
    //                 createGallery(itemsGallery, gallery)
    //                 createGallery(itemsGallery, galleryModal)
    //             } else {
    //                 console.log(deleteImage)
    //             }
    //         }
    //     })
    // }

    createGallery(itemsGallery, gallery)
    createGallery(itemsGallery, galleryModal)

    btnAjout.addEventListener('click', (e) => {
        modal1.style.display = 'none'
        modal2.style.display = 'flex'
        retour.style.opacity = 1
        retour.style.cursor = 'pointer'
    })

    retour.addEventListener('click', () => {
        retourModal1()
    })

    closeModal.addEventListener("click", () => {
        modal.close()
        modal.style.display = 'none'
        resteGeneral()
        retourModal1()
    })

    ajoutPhoto.addEventListener('change', function (event) {
        event.preventDefault()
        event.stopPropagation()
        const file = event.target.files[0]

        if (file && validFileType(file) && validFileSize(file)) {
            // Lire le contenu du fichier
            const reader = new FileReader()

            reader.onload = function () {
                imgElement.src = reader.result
                imgElement.className = 'image'
                choixImage.style.display = 'none'
                previewDiv.innerHTML = ''
                previewDiv.style.display = 'flex'
                previewDiv.appendChild(imgElement)

                checkFormAjouter(formAjout)
            }

            reader.readAsDataURL(file)

        } else {
            restePreview()
            const fileSizeInMegabytes = file.size / (1024 * 1024)
            if (!validFileSize(file)) {
                messageError(`Taille de fichier max 4mo / ${fileSizeInMegabytes.toFixed(2)}mo`)
            } else if (!validFileType(file)) {
                messageError(`Type de fichier accepter jpg, png / ${file.type.split('/')[1]}`)
            }
        }
    })

    modal2.addEventListener('change', () => {
        btnValider.disabled = checkFormAjouter(formAjout)
    })

    const submitHandler = async function (event) {
        event.preventDefault()
        event.stopPropagation()
        const formData = new FormData(this);

        const curlPost = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${adminData.token}`,
            },
            body: formData,
        };

        const postImage = await makeFetchRequest(urlWorks, curlPost);

        if (postImage) {

            restePreview()
            resteInput()
            modal.close()
            retourModal1()
            modal.style.display = 'none'

            const itemsGallery = await makeFetchRequest(urlWorks, curl)
            createGallery(itemsGallery, gallery)
            createGallery(itemsGallery, galleryModal)

        } else {
            messageError('Echec lors de la connection au serveur')
        }
    };

    // Ajoutez l'écouteur d'événements en utilisant la fonction de rappel
    formAjout.addEventListener('submit', submitHandler)



})
