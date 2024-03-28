export function useAuth() {
    return {
        authenticated: !!window.localStorage.getItem('auth-entropy')
    }
}