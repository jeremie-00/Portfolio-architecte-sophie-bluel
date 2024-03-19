import { makeFetchRequest } from './modules/makeFetch.js';
import { createGallery } from './modules/galleryManager.js';
import { createFilterButtons, resteColorButton, filterCategory } from './modules/filterManager.js';
import { admin, createLinkLog } from './modules/logManager.js';
import { createLinkModal } from './modules/modalManager.js';

import {qs, qsa, createElement, saveStorage, removeStorage, loadStorage } from './modules/domFunctions.js';

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

    createGallery(itemsGallery)
    createFilterButtons(categories)
    filterCategory(itemsGallery)

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

    const modal = qs('.modal');
    const closeModal = qs(".modal-close");
    
    openModal.addEventListener("click", () => {
        modal.showModal()
        const modal1 = qs('.content-modal-1')
        const modal2 = qs('.content-modal-2')
        const retour = qs('.modal-retour')
        retour.style.opacity = 0
        retour.style.cursor = 'default'
        const galleryModal = qs('.gallery-modal')
        galleryModal.innerHTML = ''
        itemsGallery.forEach((item) => {
            const figure = createElement('figure')
            const img = createElement('img')
            const icone = createElement('i')
            icone.className = "fa-solid fa-trash-can fa-xs"
            icone.setAttribute('data-index', item.id)
            figure.setAttribute('data-index', item.id)
            img.src = item.imageUrl
            figure.append(img, icone)
            galleryModal.appendChild(figure)

            // icone.addEventListener('click', () => {
            //     figure.style.display = 'none'       
            // })
        })
        const btnAjout = qs('#btn-ajout')
        btnAjout.addEventListener('click', () =>{
            modal1.style.display = 'none'
            modal2.style.display = 'flex'
            retour.style.opacity = 1
            retour.style.cursor = 'pointer'
        })
        retour.addEventListener('click', () =>{
            modal1.style.display = 'flex'
            modal2.style.display = 'none'
            retour.style.opacity = 0
            retour.style.cursor = 'default'
        })
    })
    
    closeModal.addEventListener("click", () => {
        modal.close()
    })   

})