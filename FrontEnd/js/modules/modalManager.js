import { qs, qsa, createElement, masquerElement, afficherElement} from './domFunctions.js';

export function navigationModal() {
    //bouton modifier, ouverture et fermeture modal
    const openModal1 = qs('#open-modal-1')
    const allCloseModal = qsa('.modal-close')
    //modal 1 et 2
    const modal1 = qs('#modal1')
    const modal2 = qs('#modal2')
    //navigation modal
    const openModal2 = qs('#open-modal-2')
    const retour = qs('.modal-retour')

    const formAjout = qs('#ajouter')
    const preview = qs('#imagePreview')

    const btnValider = qs('#btn-valide')
    //reset formulaire modal
    function resetFormModal() {
        choixImage.style.display = 'flex'
        masquerElement(preview)
        formAjout.reset()
    }
    openModal1.addEventListener('click', () => {
        resetFormModal()
        modal1.showModal()
    })

    allCloseModal.forEach(close => close.addEventListener('click', () => {
        modal1.close()
        modal2.close()
    }))

    openModal2.addEventListener('click', () => {
        modal1.close()
        modal2.showModal()
        btnValider.disabled = true
    })
    retour.addEventListener('click', () => {
        resetFormModal()
        modal2.close()
        modal1.showModal()
    })

    //fermeture modal si on click en dehors
    document.addEventListener('click', function (event) {
        if (event.target.open) {
            modal1.close()
            modal2.close()
        }
    })
}

export const categoryModal = (categories) => {
    const selectCategory = qs('#category')
    categories.forEach(category => {
        const option = createElement('option')
        option.text = `${category.name}`
        option.value = category.id
        selectCategory.appendChild(option)
    })
}

export function affichagePhoto(file) {
    // Lire le contenu du fichier
    const reader = new FileReader()
    reader.onload = function () {
        const preview = qs('#imagePreview')
        const previewImage = qs('#imagePreview img')
        const choixImage = qs('#choixImage')
        previewImage.src = reader.result
        previewImage.className = 'image'
        afficherElement(preview)
        masquerElement(choixImage)
    }
    reader.readAsDataURL(file)
}
