
import { qsa, createElement, loadAdminData } from './domFunctions.js';
import { makeFetchRequest } from './makeFetch.js';
import { URLs } from '../script.js'

export function createItemGalleryPrincipal(work) {
    const fragment = document.createDocumentFragment()
    const figure = createElement('figure')
    const img = createElement('img')
    const figcaption = createElement('figcaption')
    figure.className = 'work'
    figure.setAttribute('data-id', work.id)
    figure.setAttribute('data-category-id', work.categoryId)
    img.src = work.imageUrl
    figcaption.innerHTML = work.title
    figure.append(img, figcaption)
    fragment.appendChild(figure)
    return fragment
}

export function createItemGalleryModal(work) {
    const fragment = document.createDocumentFragment()
    const figure = createElement('figure')
    const img = createElement('img')
    const icone = createElement('i')
    figure.className = 'work'
    icone.className = "fa-solid fa-trash-can fa-xs"
    figure.setAttribute('data-id', work.id)
    icone.setAttribute('data-id', work.id)
    img.src = work.imageUrl
    figure.append(img, icone)
    fragment.appendChild(figure)
    icone.addEventListener('click', deleteWork)
    return fragment
}

async function deleteWork(event) {
    const id = event.target.getAttribute('data-id')
    const adminData = loadAdminData('admin')
    const allWorks = qsa('.work')

    const curlDelete = {
        method: 'DELETE',
        headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${adminData.token}`
        },
    }

    const deleteImage = await makeFetchRequest(URLs.urlWorks + `/${id}`, curlDelete)

    if (deleteImage instanceof Error) {
        alert(deleteImage)
    } else {
        allWorks.forEach(work => {
            if (work.getAttribute('data-id') === id) {
                const parentFigure = work.closest('figure')
                parentFigure.remove()
            }
        })
    }
}