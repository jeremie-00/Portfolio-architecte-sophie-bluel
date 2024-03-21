import { qs, qsa, createElement } from './domFunctions.js';



const listenEvent = () => {
    const allTrash = qsa('.fa-trash-can')
    allTrash.forEach((trash) => {
        trash.addEventListener('click', async (event) => {
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
                // const deleteImage = true
                if (deleteImage) {
                    
                    const itemsGallery = await makeFetchRequest(urlWorks, curl)
                    createGallery(itemsGallery, gallery)
                    createGallery(itemsGallery, galleryModal)

                } else {
                    console.log(deleteImage)
                }
            }
        })
    })
}


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
            listenEvent()
            figure.append(img, icone)
        }

        fragment.appendChild(figure)
    })

    container.appendChild(fragment)


}

