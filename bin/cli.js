#!/usr/bin/env node

/**
 * 引入问候依赖
 * 注意！！！！！
 * 如果想要使用commonjs模式，需要下载inquirer@8.0.0版本，高版本使用ESM格式
 * 
 */
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs')


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
    fs.readdir(templeteURL, (err, files) =>{
        if(err) throw err;


        /**
         * fs.mkdirSync在根目录创建src文件夹
         */
        fs.mkdirSync(path.join(cwdUrl, 'src'))

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
            ejs.renderFile(path.join(templeteURL, file), answers).then(data => {
                /**
                 * 生成ejs处理后的模板文件
                 * writeFileSync 数据同步写入
                 */
                fs.writeFileSync(path.join(path.resolve(cwdUrl, 'src'), file), data)
            })
        })
    })


})