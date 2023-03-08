#!/usr/bin/env node

/**依赖
 * 引入问候
 */
const inquirer = require('inquirer');

/**
 * inquire.protmpt： 设置需要向用户询问的信息。
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
    console.log(answers)
})