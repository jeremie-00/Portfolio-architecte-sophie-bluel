import { makeFetchRequest } from './modules/makeFetch.js';
import { createGallery } from './modules/galleryManager.js';
import { createFilterButtons, resteColorButton, filterCategory, categoryModal } from './modules/filterManager.js';
import { admin, createLinkLog } from './modules/logManager.js';
import { createLinkModal } from './modules/modalManager.js';
import { checkFormAjouter, validFileType, validFileSize } from './modules/checkForm.js'

import { qs, qsa, createElement, saveStorage, removeStorage, loadStorage, masquerElement, afficherElement } from './modules/domFunctions.js';

const urlWorks = "http://localhost:5678/api/works"
const curl = {
    method: 'GET',
    headers: {
        'accept': 'application/json',
    },
}
const galleries = {
    'gallery': qs('.gallery'),
    'galleryModal': qs('.gallery-modal')
}

const adminDataJSON = loadStorage('admin')
const adminData = JSON.parse(adminDataJSON)

export { adminData, urlWorks, curl, galleries }

document.addEventListener('DOMContentLoaded', async function () {

    const itemsGallery = await makeFetchRequest(urlWorks, curl)

    const urlCategories = "http://localhost:5678/api/categories"
    const categories = await makeFetchRequest(urlCategories, curl)

    createGallery(itemsGallery, galleries.gallery)
    createGallery(itemsGallery, galleries.galleryModal)

    createFilterButtons(categories)
    categoryModal(categories)

    filterCategory(itemsGallery)

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
        afficherElement(choixImage)
        previewDiv.innerHTML = ''
        masquerElement(previewDiv)
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
        afficherElement(modal)
        modal.showModal()
        btnValider.disabled = true
    })

    btnAjout.addEventListener('click', () => {
        masquerElement(modal1)
        afficherElement(modal2)
        retour.style.opacity = 1
        retour.style.cursor = 'pointer'
    })
    const retourModal1 = () => {
        afficherElement(modal1)
        masquerElement(modal2)
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
        masquerElement(modal)
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
                masquerElement(choixImage)
                previewDiv.innerHTML = ''
                afficherElement(previewDiv)
                previewDiv.appendChild(imgElement)

                btnValider.disabled = checkFormAjouter(formAjout)
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

        const formData = new FormData(this)

        const curlPost = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${adminData.token}`,
            },
            body: formData,
        }

        const postImage = await makeFetchRequest(urlWorks, curlPost)

        if (postImage) {

            restePreview()
            resteInput()
            modal.close()
            retourModal1()
            masquerElement(modal)

            const itemsGallery = await makeFetchRequest(urlWorks, curl)
            createGallery(itemsGallery, galleries.gallery)
            createGallery(itemsGallery, galleries.galleryModal)

        } else {
            messageError('Echec lors de la connection au serveur')
        }
    }

    formAjout.addEventListener('submit', submitHandler)
})
