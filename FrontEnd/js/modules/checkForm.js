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