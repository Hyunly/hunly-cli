#!/usr/bin/env node

const createProject = require('./create.js')

const CREATE = 'CREATE'

/**
 * 如果没有使用 `hunly craete` 命令 则不创建文件
 */
if(process.argv[2].toLocaleUpperCase() !== CREATE) return

createProject();
