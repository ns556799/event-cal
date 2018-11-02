const $html = document.querySelector('html')
export const site = $html.dataset.site

export const isDev = process.env.NODE_ENV === 'development'
export const isProd = process.env.NODE_ENV === 'production'
