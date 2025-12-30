import { getAccessToken } from "@/app/lib/actions";

const apiService = {
    get: async function (url: string, token?: string | null): Promise<any> {
        console.log('get', url);

        return new Promise((resolve, reject) => {
            const headers: HeadersInit = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`
            }
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'GET',
                headers: headers
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },
    post: async function (url: string, data: any): Promise<any> {
        console.log('post', url, data);

        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))

        })
    },

    postWithoutToken: async function (url: string, data: any): Promise<any> {
        console.log('post', url, data);

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))

        })
    }
}


export default apiService;