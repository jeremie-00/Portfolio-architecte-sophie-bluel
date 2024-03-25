export const qs = (selector) => document.querySelector(selector)
export const qsa = (selector) => document.querySelectorAll(selector)
export const createElement = (element) => document.createElement(element)

export function saveStorage(key, data) {
    localStorage.setItem(key, data)
}

export function removeStorage(key) {
    localStorage.removeItem(key)
}

export function loadStorage(key) {
    return localStorage.getItem(key)
}

export function loadAdminData(key) {
    const admin = loadStorage(key)
    return JSON.parse(admin)
}

export function masquerElement(element) {
    element.style.display = 'none'
}

export function afficherElement(element) {
    element.style.display = 'block'
}

export const setMessageError = (message) => {
    const containerError = qs('.message-error')
    containerError.innerHTML = message
}

export const isAdmin = () => {
    if (loadStorage('admin')) {
        return true
    }
    return false
}

export function gestionAffichagePage() {
    const banner = qs('.banner')
    const log = qs('ul li:nth-child(3)')
    const allBtnsFilter = qsa('.filter')
    const openModal1 = qs('#open-modal-1')
    if (isAdmin()) {
        banner.style.height = '59px'
        log.innerHTML = 'logout'
        afficherElement(openModal1)
        allBtnsFilter.forEach((btn) => {
            masquerElement(btn)
        })
    } else {
        banner.style.height = '0'
        log.innerHTML = 'login'
        masquerElement(openModal1)
        allBtnsFilter.forEach((btn) => {
            afficherElement(btn)
        })
    }
}
