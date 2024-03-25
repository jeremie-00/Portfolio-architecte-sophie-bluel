const URLs = {
    'urlWorks' : 'http://localhost:5678/api/works',
    'urlCategories' : 'http://localhost:5678/api/categories',
    'urlLogin' : 'http://localhost:5678/api/users/login',
}

const curlGET = {
    method: 'GET',
    headers: {
        'accept': 'application/json',
    },
}

export { URLs, curlGET }