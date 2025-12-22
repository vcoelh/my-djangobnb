'use server';

import { cookies } from "next/headers";

export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    const myCookieStore = await cookies()

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

    return accessToken;
}