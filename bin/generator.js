/**
 * 从远程获取模板名称并供用户选择
 */

const Utils = require('./utils.js')
const getRepoList = require('./http.js').getRepoList
const Query = require('./quirer.js')

class Generator {
    constructor(name){
        
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

    // 核心创建逻辑
    // 1）获取模板名称
    // 3）下载模板到模板目录
    async create(){
        const repo = await this.getRepos()

        console.log(repo)
    }
}

module.exports = Generator