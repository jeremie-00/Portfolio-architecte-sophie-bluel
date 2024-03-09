export async function makeFetchRequest(url, curl) {
    try {
        const response = await fetch(url, curl)
        if (response.ok) {
            return response.json()
        } else {
            throw new Error(response.status + ' ' + response.statusText)   
        }
    } catch (error) {
        console.error(error)
        return error
    }
}