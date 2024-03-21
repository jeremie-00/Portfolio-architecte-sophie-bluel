import { makeFetchRequest } from './modules/makeFetch.js';
import { createGallery } from './modules/galleryManager.js';
import { createFilterButtons, resteColorButton, filterCategory, categoryModal } from './modules/filterManager.js';
import { admin, createLinkLog } from './modules/logManager.js';
import { createLinkModal } from './modules/modalManager.js';

import { qs, qsa, createElement, saveStorage, removeStorage, loadStorage } from './modules/domFunctions.js';

document.addEventListener('DOMContentLoaded', async function () {

    const urlWorks = "http://localhost:5678/api/works"
    const urlCategories = "http://localhost:5678/api/categories"
    const curl = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
        },
    }

    const itemsGallery = await makeFetchRequest(urlWorks, curl)
    const categories = await makeFetchRequest(urlCategories, curl)
    console.log(itemsGallery)
    const gallery = qs('.gallery')
    const galleryModal = qs('.gallery-modal')

    createGallery(itemsGallery, gallery)
    createGallery(itemsGallery, galleryModal)

    createFilterButtons(categories)
    filterCategory(itemsGallery)
    categoryModal(categories)

    const linkLog = createLinkLog()

    const adminDataJSON = loadStorage('admin')
    const adminData = JSON.parse(adminDataJSON)

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

    const retourModal1 = () => {
        modal1.style.display = 'flex'
        modal2.style.display = 'none'
        retour.style.opacity = 0
        retour.style.cursor = 'default'
        restePreview()
    }

    const resteMessageError = () => containerError.innerHTML = ''

    const messageError = (message) => {
        resteMessageError()
        containerError.innerHTML = message
    }



    openModal.addEventListener("click", () => {
        modal.style.display = 'flex'
        modal.showModal()
        retour.style.opacity = 0
        retour.style.cursor = 'default'
        btnValider.disabled = true
        const trash = qs('.fa-trash-can')
        itemsGallery.forEach((item) => {
            // const figure = createElement('figure')
            // const img = createElement('img')
            //console.log(item.id)
            //const trash = qs('.fa-trash-can')
            // icone.className = "fa-solid fa-trash-can fa-xs"
            //trash.setAttribute('data-index', item.id)
            // figure.setAttribute('data-index', item.id)
            // img.src = item.imageUrl
            // figure.append(img, icone)
            // galleryModal.appendChild(figure)

            // trash.addEventListener('click', async () => {
            //     console.log(trash.getAttribute('data-index'))
            //     // const id = icone.getAttribute('data-index')
            //     // const curlDelete = {
            //     //     method: 'DELETE',
                            //accept: */*,
            //     //     headers: {
            //     //         'Authorization': `Bearer ${adminData.token}`
            //     //     },
            //     // }
            //     // const deleteImage = await makeFetchRequest(urlWorks + `/${id}`, curlDelete)
            //     // console.log(deleteImage)
            // })
        })
        const allTrash = qsa('.fa-trash-can')

        allTrash.forEach((trash) => {
            trash.addEventListener('click', async () => {
                const id = trash.getAttribute('data-index')
                const curlDelete = {
                    method: 'DELETE',
    
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${adminData.token}`
                    },
                }
                const deleteImage = await makeFetchRequest(urlWorks + `/${id}`, curlDelete)

                if (deleteImage) {
                    //trash.closest('.gallery-item').remove()
                    const itemsGallery = await makeFetchRequest(urlWorks, curl)
                    createGallery(itemsGallery, gallery)
                    createGallery(itemsGallery, galleryModal)
                }else{
                    console.log(deleteImage)
                }
            })
        })

    })



    

    btnAjout.addEventListener('click', () => {
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
        retourModal1()
        resteMessageError()
    })

    const fileTypes = ["image/jpg", "image/png"]
    function validFileType(file) {
        for (var i = 0; i < fileTypes.length; i++) {
            if (file.type === fileTypes[i]) {
                return true
            }
        }
        return false
    }

    function validFileSize(file) {
        const maxSize = 4
        const fileSizeInMegabytes = file.size / (1024 * 1024)
        if (fileSizeInMegabytes >= maxSize) {
            return false
        }
        return true
    }

    const ajoutPhoto = qs('#file')

    const titleInput = qs('#title')
    const categorySelect = qs('#category')
    //const categoryPhoto = categorySelect.value;

    const imgElement = createElement('img')
    const previewDiv = qs('#imagePreview')
    const choixImage = qs('#choixImage')

    const restePreview = () => {
        imgElement.src = ''
        choixImage.style.display = 'flex'
        previewDiv.innerHTML = ''
        previewDiv.style.display = 'none'
    }
    const resteInput = () => {
        titleInput.value = ''
    }

    ajoutPhoto.addEventListener('change', function (event) {
        const file = event.target.files[0]
        //const fileSizeInBytes = file.size
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
        console.log(ajoutPhoto.value)
        if (ajoutPhoto && titleInput.value && categorySelect.value) {
            btnValider.disabled = false
        }
    })
    
    
    btnValider.addEventListener('click', async () => {
        const formData = new FormData()
        formData.append('image', ajoutPhoto.files[0])
        formData.append('title', titleInput.value)
        formData.append('category', categorySelect.value)

        const curlPost = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${adminData.token}`
            },
            body: formData,
        }

        const postImage = await makeFetchRequest(urlWorks, curlPost)


        if (postImage) {
            const itemsGallery = await makeFetchRequest(urlWorks, curl)
            createGallery(itemsGallery, gallery)
            createGallery(itemsGallery, galleryModal)
            modal.close()
            modal.style.display = 'none'
            restePreview()
            resteInput()
            retourModal1()
        } else {
            messageError('Echec lors de la connection au server')
        }


    })

})
