/** 工具函数模块 */
const ora = require('ora')
const figlet = require('figlet')

const LOGO_FONT = 'HUNLY-CLI'

class Utils {
    /**
     *  加载动画
     */
    async wrapLoading(fn, message, ...args){
        const spinner = ora(message) // 初始化ora
        spinner.start()  // 动画开始

        try {
            let result = await fn(...args)
            spinner.succeed()  // 请求成功
            return result
        } catch (error) {
            spinner.fail('Request failed, refetch ...')
            return false
        }
    }

    /**
     * logo字体
     */
    logoText(){
        return figlet.textSync(LOGO_FONT, {
            horizontalLayout: 'full',
            verticalLayout: 'default',
            whitespaceBreak: false
        })
    }
}

module.exports = new Utils()