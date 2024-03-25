export async function makeFetchRequest(url, curl) {
    try {
        const response = await fetch(url, curl)
        if (response.ok) {
            if (response.status === 204) {
                return true
            } else {
                return response.json()
            }
        } else {
            throw new Error(response.status + ' ' + response.statusText)
        }
    } catch (error) {
        return error
    }
}