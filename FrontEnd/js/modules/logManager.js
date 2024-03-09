import { qs, qsa, createElement } from './domFunctions.js';

export const admin = () => {
    if (localStorage.getItem('userId') != null && localStorage.getItem('token') != null){
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



