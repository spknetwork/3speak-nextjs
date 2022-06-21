import { OAUTH2_CLIENTS } from "../constants"

export const APP_ALLOWED_REDIRECT_URLS: Record<string, any> = {}

for (let CLIENT of Object.keys(OAUTH2_CLIENTS)) {
  Object.defineProperty(APP_ALLOWED_REDIRECT_URLS, CLIENT, {
    value: OAUTH2_CLIENTS[CLIENT as '2vn8qv3lcg5r9qtd4camrq7l9u'].redirect_urls
  })
}

export const getRedirectUrl = (proposed: string, app: string, fallback = 'https://3speak.tv') => {
  return APP_ALLOWED_REDIRECT_URLS[app] && APP_ALLOWED_REDIRECT_URLS[app].includes(proposed) ? proposed : fallback
}