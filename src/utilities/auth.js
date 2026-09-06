export function getAuthToken(userInfo) {
    return userInfo?.token || userInfo?.access || null
}

export function getTokenExpiry(token) {
    if (!token || typeof token !== 'string') {
        return null
    }

    const parts = token.split('.')
    if (parts.length < 2) {
        return null
    }

    try {
        const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/')
        const padded = payload + '='.repeat((4 - (payload.length % 4)) % 4)
        const parsed = JSON.parse(atob(padded))
        return typeof parsed.exp === 'number' ? parsed.exp * 1000 : null
    } catch (error) {
        return null
    }
}

export function isTokenExpired(token) {
    const expiry = getTokenExpiry(token)
    if (expiry == null) {
        return true
    }
    return Date.now() >= expiry
}
