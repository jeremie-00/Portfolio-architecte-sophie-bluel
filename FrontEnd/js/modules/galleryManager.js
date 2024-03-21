import { qs, qsa, createElement } from './domFunctions.js';

export function createGallery(itemsGallery, container) {
    container.innerHTML = ''
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
        }else{
            const icone = createElement('i')
            icone.className = "fa-solid fa-trash-can fa-xs"
            icone.setAttribute('data-index', item.id)
            figure.append(img, icone)
        }

        container.appendChild(figure)
    })
}