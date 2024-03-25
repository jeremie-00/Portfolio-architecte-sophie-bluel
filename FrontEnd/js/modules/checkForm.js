export function isEmailValid(email) {
    const regex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    return regex.test(email)
}

export function isPasswordValid(password) {

    if (password.length < 6) {
        return false
    }

    // const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    // if (!specialCharacters.test(password)) {
    //     return false
    // }

    const numbers = /\d/
    if (!numbers.test(password)) {
        return false
    }

    const uppercaseLetters = /[A-Z]/
    if (!uppercaseLetters.test(password)) {
        return false
    }

    const lowercaseLetters = /[a-z]/
    if (!lowercaseLetters.test(password)) {
        return false
    }

    return true
}

export function checkFormAjouter(formAjout) {
    for (let i = 0; i < formAjout.length; i++) {
        const element = formAjout[i]
        if (element.type !== "submit") {
            if (!element.value || element.value.trim() === '') {
                return true
            }
        }
    }
    return false
}

export function validFileType(file) {
    const fileTypes = ["image/jpg", "image/png"]
    for (var i = 0; i < fileTypes.length; i++) {
        if (file.type === fileTypes[i]) {
            return true
        }
    }
    return false
}

export function validFileSize(file) {
    const maxSize = 4
    const fileSizeInMegabytes = file.size / (1024 * 1024)
    if (fileSizeInMegabytes >= maxSize) {
        return false
    }
    return true
}