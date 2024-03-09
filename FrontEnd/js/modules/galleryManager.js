import { qs, qsa, createElement } from './domFunctions.js';

export function createGallery(itemsGallery) {
    const gallery = qs('.gallery')
    itemsGallery.forEach((item) => {
        const figure = createElement('figure')
        const img = createElement('img')
        const figcaption = createElement('figcaption')

        figure.className = 'js-work'
        figure.setAttribute('data-index', item.id)

        img.src = item.imageUrl
        figcaption.innerHTML = item.title
        
        figure.append(img, figcaption)
         gallery.appendChild(figure)
    })
}