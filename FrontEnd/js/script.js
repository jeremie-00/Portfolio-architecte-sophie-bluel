import { makeFetchRequest } from './modules/makeFetch.js';
import { qs, qsa, removeStorage, loadAdminData, setMessageError, gestionAffichagePage, isAdmin } from './modules/domFunctions.js';
import { createAllFilters, filtrageGallery } from './modules/filtersManager.js';
import { createGalleries, updateGalleries } from './modules/galleriesManager.js';
import { validFileType, validFileSize, checkFormAjouter } from './modules/checkForm.js'
import { navigationModal, categoryModal, affichagePhoto } from './modules/modalManager.js'
import { URLs, curlGET } from './modules/variables.js';

document.addEventListener('DOMContentLoaded', async function () {
    //Galleries principal et modal
    createGalleries()

    const categories = await makeFetchRequest(URLs.urlCategories, curlGET)
    //Bouton de filtre
    createAllFilters(categories)
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

    //gestion modal
    navigationModal()
    //creation categorie selecte modal
    categoryModal(categories)

    //ajout fichier
    const btnAjoutPhoto = qs('#file')
    btnAjoutPhoto.addEventListener('change', function (event) {
        event.preventDefault()
        event.stopPropagation()
        const file = event.target.files[0]
        if (file && validFileType(file) && validFileSize(file)) {
            affichagePhoto(file)
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
    const envoiFormAjout = async function (event) {
        event.preventDefault()
        const btnValider = qs('#btn-valide')
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
            const modal2 = qs('#modal2')
            modal2.close()
        }
    }

    const formAjout = qs('#ajouter')
    formAjout.addEventListener('submit', envoiFormAjout)

    formAjout.addEventListener('input', () => {
        const btnValider = qs('#btn-valide')
        btnValider.disabled = checkFormAjouter(formAjout)
    })

    //mise en page normal ou admin
    gestionAffichagePage()

})