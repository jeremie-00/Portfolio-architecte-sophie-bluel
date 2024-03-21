import { qs, qsa, createElement } from './domFunctions.js';
import { makeFetchRequest } from './makeFetch.js';

import { adminData, urlWorks, curl, galleries } from '../script.js';

export function createGallery(itemsGallery, container) {

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment()

    itemsGallery.forEach((item) => {
        const figure = createElement('figure')
        const img = createElement('img')

        figure.className = 'js-work'

        figure.setAttribute('data-index', item.id)

        img.src = item.imageUrl

        if (container.id === 'gallery') {
            const figcaption = createElement('figcaption')
            figcaption.innerHTML = item.title
            figure.append(img, figcaption)
        } else {
            const icone = createElement('i')
            icone.className = "fa-solid fa-trash-can fa-xs"
            icone.setAttribute('data-index', item.id)
            listenEvent(icone)
            figure.append(img, icone)
        }

        fragment.appendChild(figure)
    })

    container.appendChild(fragment)  
}

function listenEvent(icone) {
    icone.addEventListener('click', async (event) => {
        const trashIcon = event.target.closest('.fa-trash-can')

        if (trashIcon) {
            const id = trashIcon.getAttribute('data-index')

            const curlDelete = {
                method: 'DELETE',
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${adminData.token}`
                },
            }
            const deleteImage = await makeFetchRequest(urlWorks + `/${id}`, curlDelete)

            if (deleteImage) {
                const itemsGallery = await makeFetchRequest(urlWorks, curl)
                createGallery(itemsGallery, galleries.gallery)
                createGallery(itemsGallery, galleries.galleryModal)
            } else {
                console.log(deleteImage)
            }
        }
    })
}
