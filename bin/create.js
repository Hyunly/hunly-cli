
const fs = require('fs');
const path = require('path');

/**
 * chalk ==> chalk@4.0.0支持commonjs引入
 */
const chalk = require('chalk')
const ejs = require('ejs')

const logoText = require('./logo.js').logoText


const createFile = function (projectName) {
    // 输出项目名称
    const projectNameStyle = chalk.green.bold;
    console.log('Your project name is ' + projectNameStyle(projectName.name))

    /**
     * 模板文件目录
     * 获取上级目录 path.resolve(__dirname, '..')
     */
    const templeteURL = path.join(path.resolve(__dirname, '..'), 'templetes');

    /**
     * 生成文件目录
     * process.cwd() 对应控制台所在目录
     */
    const cwdUrl = process.cwd()

    /**
     * 读取templets目录中的文件
     */
    fs.readdir(templeteURL, (err, files) => {
        if (err) throw err;

        /**
         * fs.mkdirSync在根目录创建src文件夹
         * 如果当前目录下有src则删除该文件夹
         * 
         * fs.existsSync 判断目录是否存在, 通过path.resolve拼接出src路径
         */
        const srcUrl = path.join(cwdUrl, 'src')

        if (fs.existsSync(srcUrl)) {
            /**
             * 如果存在src文件夹则移除该文件夹
             * rmSync 默认只能删除空目录，如果想要删除非空目录则需要加recursive字段
             */
            fs.rmSync(srcUrl, { recursive: true })
        }

        fs.mkdirSync(srcUrl)

        /**
         * files 文件地址数组
         * [ 'common.css', 'index.html' ]
         */
        files.forEach((file) => {
            /**
             * 使用ejs渲染对应的模板文件
             * 
             * renderFile（模版文件地址，传入渲染数据）
             */
            ejs.renderFile(path.join(templeteURL, file), projectName).then(data => {
                /**
                 * 生成ejs处理后的模板文件
                 * writeFileSync 数据同步写入
                 */
                fs.writeFileSync(path.join(path.resolve(cwdUrl, 'src'), file), data)
            })
        })

        console.log(logoText)
    })
}

module.exports = {
    createFile
}