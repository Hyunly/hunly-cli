/** 查询输入 */

/**
 * 引入问候依赖
 * 注意！！！！！
 * 如果想要使用commonjs模式，需要下载inquirer@8.0.0版本，高版本使用ESM格式
 */
const inquirer = require('inquirer');

/**
 * inquire.prompt： 设置需要向用户询问的信息。
 * []：配置为一个数组，表示可以多次访问
 */

class Query{
    async getProName(){
        const { projectName } = await inquirer.prompt([
            {
                name: 'projectName',
                type: 'input',
                message: 'Your project name?',
                default: 'my-app'
            }
        ])

        return projectName
    }
    async isOverWrite(){
        let { action } = await inquirer.prompt([
            {
              name: 'action',
              type: 'list',
              message: '该目录已存在，是否需要覆盖？',
              choices: [
                {
                  name: '覆盖',
                  value: 'overwrite'
                },{
                  name: '取消',
                  value: false
                }
              ]
            }
          ])

          return action
    }
}

module.exports = new Query()