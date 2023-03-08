const figlet = require('figlet')

const LOGO_FONT = 'HUNLY-CLI'

const logoText = figlet.textSync(LOGO_FONT, {
    horizontalLayout: 'full',
    verticalLayout: 'default',
    whitespaceBreak: false
})

module.exports = {
    logoText
}