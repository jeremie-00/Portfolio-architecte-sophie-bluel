import { makeFetchRequest } from './modules/makeFetch.js';
import { qs, qsa, createElement } from './modules/domFunctions.js';
import { createLinkLog } from './modules/logManager.js';
import { isEmailValid, isPasswordValid } from './modules/checkForm.js';

document.addEventListener('DOMContentLoaded', async function () {
    const link = createLinkLog()
    link.style.fontWeight = 'bold'
    const formLogin = qs('#js-form-login')

    function saveLocalStorage(key, data){
        localStorage.setItem(key, data)   
    }


    formLogin.addEventListener('submit', async (event) => {
        event.preventDefault()
        const email = formLogin.elements.email.value
        const password = formLogin.elements.password.value

        const containerError = qs('.js-error')
        containerError.style.color = 'rgba(220,0,0,1)'
        containerError.style.fontSize = '20px'

        if (isEmailValid(email) && isPasswordValid(password)) {
            containerError.innerHTML = ''
            const login = {
                "email": email,
                "password": password
              }
            const urlLogin = "http://localhost:5678/api/users/login"
            const curl = {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(login),
            }
            const responseLogin = await makeFetchRequest(urlLogin, curl)
            
            if (responseLogin instanceof Error) {
                if (responseLogin.message === '401 Unauthorized' || responseLogin.message ==='404 Not Found') {
                    containerError.innerHTML = 'Email ou Mot de passe invalide.'
                }else{
                    containerError.innerHTML = 'Une erreur s\'est produite lors de la connexion.'
                }
            } else {
                saveLocalStorage('userId', responseLogin.userId)
                saveLocalStorage('token', responseLogin.token)
                window.location.href = './../index.html'
            }
            
        }else{
            containerError.innerHTML = 'Format d\'e-mail ou de mot de passe invalide.'
        }
    })




})