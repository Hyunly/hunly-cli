/** 创建一个新项目 */
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

const Query = require('./quirer.js')
const Generator = require('./generator.js')
const Utils = require('./utils.js')

async function createProject(){

    console.log(`\n${Utils.logoText()}\n`)

    /**
     * 用户询问获取项目名称
     */
    const projectName = await Query.getProName();

    /**
     * 使用chalk将项目名称设置样式并输出
     */
    const styleChalk = chalk.bold.red
    
    /**
     * 打印
     */
    console.log(`\n ❤  Your project name is ${styleChalk(projectName)}\n`)

    /**
     * 获取当前指令目录
     */
    const cwdUrl = process.cwd();

    //获取想要创建的项目目录
    const projectDir = path.join(cwdUrl, projectName)

    /**
     * 判断当前项目是否在目录中存在
     */
    if(fs.existsSync(projectDir)) {
        // 向用户询问是否覆盖
        const isOverWrite = await Query.isOverWrite()
        if(!isOverWrite) {  // 不覆盖
            return 
        } else if (isOverWrite === 'overwrite') {       //覆盖
            // 移除已存在的目录
            console.log(`\r\nRemoving...`)
            await fs.remove(projectDir)
            console.log('\r\nRemove success!')
        }
    }

    /**
     * 创建项目
     */
    const generator = new Generator(projectName)
    await generator.create()

}

module.exports = createProject;