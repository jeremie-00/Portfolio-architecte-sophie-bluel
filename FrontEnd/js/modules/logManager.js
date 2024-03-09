import { qs, qsa, createElement, loadStorage } from './domFunctions.js';

export const admin = () => {
    if (loadStorage('admin') != null){
        return true
    }
    return false
}

export function createLinkLog() {
    const log = qs('ul li:nth-child(3)')
    log.innerHTML = ''
    
    const link = createElement('a')
    link.className = 'js-log'
    if (admin()) {
        link.innerHTML = 'logout'
        link.href = "index.html"
    }else{
        link.innerHTML = 'login'
        link.href = "./pages/login.html"
    }
    log.appendChild(link)
    return log
}



