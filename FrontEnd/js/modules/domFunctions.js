export const qs = (selector) => document.querySelector(selector)
export const qsa = (selector) => document.querySelectorAll(selector)
export const createElement = (element) => document.createElement(element)

export function saveStorage(key, data){
    localStorage.setItem(key, data)   
}
export function removeStorage(key) {
    localStorage.removeItem(key)
}
export function loadStorage(key){
    return localStorage.getItem(key) 
}

