'use server';

import { cookies } from "next/headers";


export async function handleRefreshToken() {
    console.log('Refreshed .....');

    const refreshToken = await getRefreshToken();

    const token = await fetch('http://localhost:8000/api/auth/token/refresh/', {
        method: 'POST',
        body: JSON.stringify({
            refresh: refreshToken,
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(async (json) => {
            console.log('Response - Refresh', json)

            if (json.access) {
                const myCookieStore = await cookies()

                myCookieStore.set('session_access_token', json.access, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60, // 60 minutes
                    path: '/'
                });

                return json.access
            } else {
                resetAuthCookies();
            }
        })
        .catch(() => {
            resetAuthCookies();
        })


    return token
}


export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    const myCookieStore = await cookies();

    myCookieStore.set('session_userid', userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/'
    });

    myCookieStore.set('session_access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60, // 60 minutes
        path: '/'
    });

    myCookieStore.set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/'
    });

    console.log('', myCookieStore.getAll())
}


export async function resetAuthCookies() {
    const myCookies = await cookies()

    myCookies.set('session_userid', '');
    myCookies.set('session_access_token', '');
    myCookies.set('session_refresh_token', '');

}

//
// Get data
export async function getUserId() {
    const myCookies = await cookies()
    const userid = myCookies.get('session_userid')?.value
    return userid ? userid : null
}

export async function getAccessToken() {
    const myCookies = await cookies()
    let accessToken = myCookies.get('session_access_token')?.value;

    if (!accessToken) {
        accessToken = await handleRefreshToken();
    }

    return accessToken;
}

export async function getRefreshToken() {
    const myCookies = await cookies()
    let accessToken = myCookies.get('session_refresh_token')?.value;

    return accessToken;
}