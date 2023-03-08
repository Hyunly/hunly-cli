#!/usr/bin/env node

/**
 * 引入问候依赖
 * 注意！！！！！
 * 如果想要使用commonjs模式，需要下载inquirer@8.0.0版本，高版本使用ESM格式
 */
const inquirer = require('inquirer');

const create = require('./create.js')

const CREATE = 'CREATE'

/**
 * 如果没有使用 `hunly craete` 命令 则不创建文件
 */
if(process.argv[2].toLocaleUpperCase() !== CREATE) return


/**
 * inquire.prompt： 设置需要向用户询问的信息。
 * []：配置为一个数组，表示可以多次访问
 */
inquirer.prompt([
    {
        type: 'input',  // 类型为输入，type： input, number, confirm, list, checkbox ... 
        name: 'name',   // key
        message: 'Your Object-name',    // 提示信息
        default: 'my-app'   // 默认值
    }
]).then(answers => {
    create.createFile(answers)
})