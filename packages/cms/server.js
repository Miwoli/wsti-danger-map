// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const strapi = require('@strapi/strapi')
const app = strapi({ distDir: 'dist' })
app.start()
