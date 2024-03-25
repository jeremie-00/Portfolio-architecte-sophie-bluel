import { qs, qsa, createElement, masquerElement, afficherElement } from './domFunctions.js';

export function createFilter(category) {
    const btn = createElement('button')
    btn.className = 'filter'
    btn.innerHTML = category.name
    btn.setAttribute('data-category-id', category.id)
    btn.type = 'submit'
    return btn
}

export const createBtnTous = () => {
    const containerFilter = qs('.container-filter')
    const btnDefault = createElement('button')
    btnDefault.innerHTML = "Tous"
    btnDefault.setAttribute('data-category-id', 0)
    btnDefault.className = 'filter selected'
    btnDefault.type = 'submit'
    containerFilter.appendChild(btnDefault)
}

export const checkDuplicate = (array) => {
    const uniqueNames = new Set()
    return array.filter(obj => {
        if (!uniqueNames.has(obj.name)) {
            uniqueNames.add(obj.name)
            return true
        }
        return false
    })
}

function colorButton(event) {
    const allBtns = qsa('.filter')
    allBtns.forEach((btn) => {
        btn.classList.remove('selected')
    })
    event.target.classList.add('selected')
}

export function filtrageGallery(event) {
    colorButton(event)
    const btn = event.target
    const categoryId = btn.dataset.categoryId
    const allWorks = qsa('.work')
    allWorks.forEach(work => {
        if (categoryId !== "0" && work.dataset.categoryId !== categoryId) {
            masquerElement(work)
        } else {
            afficherElement(work)
        }

    })
}