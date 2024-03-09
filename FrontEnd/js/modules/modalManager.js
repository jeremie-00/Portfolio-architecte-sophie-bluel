import { qs, qsa, createElement, hidden } from './domFunctions.js';
import { admin } from './logManager.js';

export function createLinkModal() {
    const h2Element = qs('#portfolio h2')
    const link = createElement('a')
    link.href = "#modal1"
    link.id = 'link-modal'
    link.innerHTML = `<i class="fa-regular fa-pen-to-square" href="#modal1"></i>  Modifier`
    h2Element.appendChild(link)
    if (!admin()) {
        hidden(link)
    }
    return link
}