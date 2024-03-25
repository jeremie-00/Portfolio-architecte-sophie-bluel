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
