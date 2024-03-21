export async function makeFetchRequest(url, curl) {
    try {
        const response = await fetch(url, curl)
        if (response.ok) {
            if (response.status === 204) {
                console.log('L\'image a été supprimée avec succès.');
                return true
            } else {
                return response.json()
            }
        } else {
            throw new Error(response.status + ' ' + response.statusText)   
        }
    } catch (error) {
        console.error(error)
        return error
    }
}