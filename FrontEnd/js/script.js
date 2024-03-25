import { makeFetchRequest } from './modules/makeFetch.js';
import { qs, qsa, createElement, loadStorage, removeStorage, masquerElement, afficherElement, loadAdminData,setMessageError } from './modules/domFunctions.js';
import { createFilter, createBtnTous, checkDuplicate, filtrageGallery } from './modules/filtersManager.js';
import { createGalleries, updateGalleries } from './modules/galleriesManager.js';
import { validFileType, validFileSize, checkFormAjouter } from './modules/checkForm.js'

const URLs = {
    'urlWorks': 'http://localhost:5678/api/works',
    'urlCategories': 'http://localhost:5678/api/categories',
    'urlLogin': 'http://localhost:5678/api/users/login',
}

const curlGET = {
    method: 'GET',
    headers: {
        'accept': 'application/json',
    },
}

export { URLs, curlGET }


document.addEventListener('DOMContentLoaded', async function () {

    //verification si l'utilisateur est admin
    const isAdmin = () => {
        if (loadStorage('admin')) {
            return true
        }
        return false
    }

    //Galleries principal et modal
    createGalleries()

    //Bouton de filtre
    const categories = await makeFetchRequest(URLs.urlCategories, curlGET)
    const containerFilter = qs('.container-filter')

    if (categories instanceof Error) {
        alert(categories)
    } else {
        createBtnTous()
        const categoriesTrier = checkDuplicate(categories)
        categoriesTrier.forEach(category => containerFilter.appendChild(createFilter(category)))
    }

    const allBtnsFilter = qsa('.filter')
    allBtnsFilter.forEach((btn) => {
        btn.addEventListener('click', filtrageGallery)
    })

    //Bouton login
    const log = qs('ul li:nth-child(3)')
    log.addEventListener('click', () => {
        if (isAdmin()) {
            removeStorage('admin')
        } else {
            window.location.href = './pages/login.html'
        }
        gestionAffichagePage()
    })

    //formulaire ajouter photo 
    const formAjout = qs('#ajouter')
    const preview = qs('#imagePreview')
    const previewImage = qs('#imagePreview img')
    const choixImage = qs('#choixImage')

    //bouton modifier, ouverture et fermeture modal
    const openModal1 = qs('#open-modal-1')
    const allCloseModal = qsa('.modal-close')
    const modal1 = qs('#modal1')
    //const wrapper = qs('.wrapper')

    //fermeture modal si on click en dehors
    document.addEventListener('click', function (event) {
        if (event.target.open) {
            modal1.close()
            modal2.close()
        }
    })

    //reset formulaire modal
    function resetFormModal() {
        choixImage.style.display = 'flex'
        masquerElement(preview)
        formAjout.reset()
    }

    //gestion de la modal (open, close)
    openModal1.addEventListener('click', () => {
        resetFormModal()
        modal1.showModal()
    })

    allCloseModal.forEach(close => close.addEventListener('click', () => {
        modal1.close()
        modal2.close()
    }))

    //navigation modal
    const openModal2 = qs('#open-modal-2')
    const modal2 = qs('#modal2')
    const retour = qs('.modal-retour')

    openModal2.addEventListener('click', () => {
        modal1.close()
        modal2.showModal()
        btnValider.disabled = true
    })
    retour.addEventListener('click', () => {
        resetFormModal()
        modal2.close()
        modal1.showModal()
    })



    //creation categorie selecte modal
    const selectCategory = qs('#category')
    const categoryModal = (categories) => {
        categories.forEach(category => {
            const option = createElement('option')
            option.text = `${category.name}`
            option.value = category.id
            selectCategory.appendChild(option)
        })
    }
    categoryModal(categories)

    //ajouter photo
    const btnAjoutPhoto = qs('#file')
    btnAjoutPhoto.addEventListener('change', function (event) {
        event.preventDefault()
        event.stopPropagation()
        const file = event.target.files[0]
        if (file && validFileType(file) && validFileSize(file)) {
            // Lire le contenu du fichier
            const reader = new FileReader()
            reader.onload = function () {
                previewImage.src = reader.result
                previewImage.className = 'image'
                afficherElement(preview)
                masquerElement(choixImage)
            }
            reader.readAsDataURL(file)
        } else {
            const fileSizeInMegabytes = file.size / (1024 * 1024)
            if (!validFileSize(file)) {
                setMessageError(`Taille de fichier max 4mo / ${fileSizeInMegabytes.toFixed(2)}mo`)
            } else if (!validFileType(file)) {
                setMessageError(`Type de fichier accepter jpg, png / ${file.type.split('/')[1]}`)
            }
        }
    })

    //envoi formulaire 
    const btnValider = qs('#btn-valide')
    const envoiFormAjout = async function (event) {
        event.preventDefault()
        btnValider.disabled = true
        const formData = new FormData(this)
        const adminData = loadAdminData('admin')
        const curlPOST = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${adminData.token}`,
            },
            body: formData,
        }
        const postImage = await makeFetchRequest(URLs.urlWorks, curlPOST)
        if (postImage instanceof Error) {
            alert(postImage)
        } else {
            updateGalleries(postImage)
            modal2.close()
        }
    }

    formAjout.addEventListener('submit', envoiFormAjout)

    formAjout.addEventListener('input', () => {
        btnValider.disabled = checkFormAjouter(formAjout)
    })

    //mise en page normal ou admin
    
    function gestionAffichagePage() {
        const banner = qs('.banner')
        const log = qs('ul li:nth-child(3)')
        const allBtnsFilter = qsa('.filter')
        const openModal1 = qs('#open-modal-1')
        if (isAdmin()) {
            banner.style.height = '59px'
            log.innerHTML = 'logout'
            afficherElement(openModal1)
            allBtnsFilter.forEach((btn) => {
                masquerElement(btn)
            })
        } else {
            banner.style.height = '0'
            log.innerHTML = 'login'
            masquerElement(openModal1)
            allBtnsFilter.forEach((btn) => {
                afficherElement(btn)
            })
        }
    }
    gestionAffichagePage()
})