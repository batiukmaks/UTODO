const server_url = 'http://localhost:5000';

export async function fetch_data(rel_url: string, method: string, body: any=null, authorized=true) {
    const url = server_url + rel_url;
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };
    if (authorized){
        headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    }
    
    try {
        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: body && JSON.stringify(body)
        })
        if (!response.ok) {
            throw new Error(response.status + ': ' + response.statusText)
        }
        const data = await response.json()
        return data
    } catch (error: any) {
        throw new Error(`Failed to fetch ${url}: ${error.message}`)
    }
}
