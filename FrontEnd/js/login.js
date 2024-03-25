import { makeFetchRequest } from './modules/makeFetch.js';
import { qs, saveStorage } from './modules/domFunctions.js';
//import { createLinkLog } from './modules/logManager.js';
import { isEmailValid, isPasswordValid } from './modules/checkForm.js';

document.addEventListener('DOMContentLoaded', async function () {
    //lien login style 
    const link = qs('ul li:nth-child(3)')
    link.style.fontWeight = 'bold'
    link.style.cursor = 'default'
    link.style.setProperty('color', 'initial')
    //render le lien inactif
    link.addEventListener('click', function(event) {
        event.preventDefault()
    })
    const formLogin = qs('#js-form-login')

    formLogin.addEventListener('submit', async (event) => {
        event.preventDefault()
        const email = formLogin.elements.email.value
        const password = formLogin.elements.password.value

        const containerError = qs('.message-error')

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
                const adminData = { 
                    'userId' : responseLogin.userId,
                    'token'  : responseLogin.token,
                    }
                
                const adminDataJSON = JSON.stringify(adminData)
                saveStorage('admin', adminDataJSON)

                window.location.href = './../index.html'
            }
            
        }else{
            containerError.innerHTML = 'Format d\'e-mail ou de mot de passe invalide.'
        }
    })




})