import { qs, qsa, createElement, masquerElement } from './domFunctions.js';
import { createGallery } from './galleryManager.js';
import { admin } from './logManager.js';

const createContainerFilter = () => {
    const h2Element = qs('#portfolio h2')
    const containerFilter = createElement('div')
    containerFilter.className = 'filters'
    h2Element.insertAdjacentElement('afterend', containerFilter)
    return containerFilter
}
const createBtnDefault = () => {
    const btnDefault = document.createElement('button')
    btnDefault.innerHTML = "Tous"
    btnDefault.setAttribute('data-index', 0)
    btnDefault.className = 'filter selected'
    btnDefault.type = 'submit'
    return btnDefault
}
const checkDuplicate = (array) => {
    const itemsNames = new Set(array.map(obj => obj.name))
    const itemsObjects = Array.from(itemsNames).map(name => {
        return array.find(obj => obj.name === name)
    })
    return itemsObjects
}

export function createFilterButtons(categories) {
    const containerFilter = createContainerFilter()
    const btnDefault = createBtnDefault()
    containerFilter.appendChild(btnDefault)

    const items = checkDuplicate(categories)
    items.forEach((item) => {
        const btn = createElement('button')
        btn.className = 'filter'
        btn.innerHTML = item.name
        btn.setAttribute('data-index', item.id)
        btn.type = 'submit'
        containerFilter.appendChild(btn)
    })
}

export function resteColorButton(allBtns) {
    allBtns.forEach((btn) => {
        btn.classList.remove('selected')
    })
}

export function filterCategory(itemsGallery) {
    const allBtns = qsa('.filter')
    const gallery = qs('.gallery')

    allBtns.forEach((btn) => {
        if (admin()) {
            masquerElement(btn)
        }
        btn.addEventListener('click', () => {
            resteColorButton(allBtns)
            btn.classList.add('selected')
            const categoryId = parseInt(btn.dataset.index)
            gallery.innerHTML = ''
            if (categoryId != 0) {
                const filteredData = itemsGallery.filter(item => item.category.id === categoryId)
                createGallery(filteredData, gallery)
            } else {
                createGallery(itemsGallery, gallery)
            }
        })


    })
}

export const categoryModal = (categories) => {
    const contentCategory = qs('#category')
    
    categories.forEach(category => {
        const option = createElement('option')
        option.text = `${category.name}`
        option.value = category.id
        contentCategory.appendChild(option)
    })

    contentCategory.value = ''
}
