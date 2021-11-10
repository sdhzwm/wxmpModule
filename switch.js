const fs = require('fs')
const path = require('path')
//源文件
const sourceFiles = {
    prefix: '/config/',
    test: 'test.json',
    dev: 'dev.json',
    prod: 'prod.json'
}
//目标文件
const targetFiles = [
    {
        prefix: '/',
        filename: 'projectConfig.js'
    }
]
const preText = 'module.exports = '
// 获取命令行参数
const cliArgs = process.argv.splice(2)
const env = cliArgs[
    0
]
// 判断是否是 prod 环境
const isProd = env.indexOf('prod') > -1 ? true : false
const isTest = env.indexOf('test') > -1 ? true : false
// 根据不同环境选择不同的源文件
const sourceFile = isProd ? sourceFiles.prod : isTest ? sourceFiles.test : sourceFiles.dev
// 根据不同环境处理数据
fs.readFile(__dirname + sourceFiles.prefix + sourceFile,
    (err, data) => {
        if (err) {
            throw new Error(`Error occurs when reading file ${sourceFile
                }.nError detail: ${err
                }`)
            process.exit(1)
        }
        // 获取源文件中的内容
        const targetConfig = JSON.parse(data)
        // 将获取的内容写入到目标文件中
        targetFiles.forEach(function (item, index) {
            let result = null

            console.log('item = ', item)
            if (item.filename === 'projectConfig.js') {
                result = preText + JSON.stringify(targetConfig,
                    null,
                    2)
            }
            console.log('result = ', result)
            // 写入文件(这里只做简单的强制替换整个文件的内容)
            fs.writeFile(__dirname + item.prefix + item.filename, result ? result : '', 'utf8', (err) => {
                if (err) {
                    throw new Error(`error occurs when reading file ${sourceFile
                        }. Error detail: ${err
                        }`)
                    process.exit(1)
                }
            })
        })
    })