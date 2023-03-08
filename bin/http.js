/** 使用axios获取远程Vue模板 */

const axios = require('axios').default

/**
 * 使用响应拦截器过滤多余返回值，例如message、code等
 */
axios.interceptors.response.use(res => res.data)

/**
 * 获取模板名称列表
 * @returns Promise
 */
function getRepoList(){
    return axios.get('https://api.github.com/orgs/zhurong-cli/repos')
}

module.exports = {
    getRepoList,
}