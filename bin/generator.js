/**
 * 从远程获取模板名称并供用户选择
 */
const util = require('util')
const path = require('path')

const downloadGitRepo = require('download-git-repo') 
const chalk = require('chalk')

const Utils = require('./utils.js')
const getRepoList = require('./http.js').getRepoList
const Query = require('./quirer.js')

class Generator {
    constructor(name){
        this.projectName = name
        this.downloadGitRepo = util.promisify(downloadGitRepo)
    }
    /**
     * 远程获取模板信息
     */
    async getRepos(){
        // 1）从远程拉取模板数据
        const repoList = await Utils.wrapLoading(getRepoList, 'waiting fetch template');
        if (!repoList) return;
        const repos = repoList.map(item => item.name)

        // 2）用户选择自己新下载的模板名称
        const repo = await Query.checkRepos(repos);
        return repo
        
    }

    // 下载远程模板
    // 1）拼接下载地址
    // 2）调用下载方法
    async download(repo){
        // 1）拼接下载地址
        const requestUrl = `zhurong-cli/${repo}`;

       let res = await Utils.wrapLoading(
                this.downloadGitRepo,
                'waiting download template...',
                 requestUrl, // 参数1: 下载地址
                 path.resolve(process.cwd(), this.projectName)  // 创建目录路径
            )

            return res
    }

    // 核心创建逻辑
    // 1）获取模板名称
    // 3）下载模板到模板目录
    async create(){
        const repo = await this.getRepos()

        await this.download(repo);
    }
}

module.exports = Generator