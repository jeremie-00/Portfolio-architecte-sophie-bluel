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


})