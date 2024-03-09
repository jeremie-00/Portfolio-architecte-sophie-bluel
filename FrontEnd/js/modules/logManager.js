import { qs, qsa, createElement } from './domFunctions.js';

export function createLinkLog() {
    const log = qs('ul li:nth-child(3)')
    log.innerHTML = ''
    
    const link = createElement('a')
    link.className = 'js-log'
    link.innerHTML = 'login'
    link.href = "./pages/login.html"
    log.appendChild(link)
    return log
}



