const {src, dest, watch, task, series, parallel} = require('gulp')
const gulpBabel = require('gulp-babel')
const {rmdirSync, existsSync} = require('fs')
const {join, dirname} = require('path')
const browserSync = require('browser-sync').create()
const rollup = require('rollup')
const {babel: rollupBabelPlugin} = require('@rollup/plugin-babel')
const {nodeResolve} = require('@rollup/plugin-node-resolve')
const rollupTypescriptPlugin = require('rollup-plugin-typescript2')
const rollupCommonjsPlugin = require('@rollup/plugin-commonjs')
const rollupReplacePlugin = require('@rollup/plugin-replace')
const {copySync} = require('fs-extra')

// 根目录
const dirPath = dirname(__dirname)
// 基础 文件夹
const compileFloder = join(dirPath, '/es')
const devFloder = join(dirPath, '/dist')
// public
const publicHtmlPath = join(dirPath, '/public/index.html')
const distHtmlPath = join(devFloder, '/index.html')

// 清理
function clear(cb){
    [compileFloder, devFloder].forEach(path=>{
        if(existsSync(path)) {
            rmdirSync(path, {recursive:true}, (err)=>{
                if(err) console.error(err);
            })
        }
    })
    cb()
}

// 编译 为 库文件夹
function esmCompile(){
    return src('../src/**/*.ts')
    .pipe(
        gulpBabel({
            "presets": [
                "@babel/preset-typescript", 
                ["@babel/preset-env", {
                    "loose": true,
                    "modules": false,
                    "useBuiltIns": false
                }]
        ],
            "plugins": ["@babel/plugin-transform-runtime"]
        })
    )
    .pipe(dest('../es'))
}

// 编译 为 库文件夹
function cjsCompile(){
    return src('../src/**/*.ts')
    .pipe(
        gulpBabel({
            "presets": [
                "@babel/preset-typescript", 
                ["@babel/preset-env", {
                    "loose": true,
                    "modules": 'cjs',
                    "useBuiltIns": false
                }]
        ],
            "plugins": ["@babel/plugin-transform-runtime"]
        })
    )
    .pipe(dest('../lib'))
}

task('build', series(clear, parallel(esmCompile, cjsCompile)))

function initDev(cb){
    copySync(publicHtmlPath, distHtmlPath)
    browserSync.init({
        server: {
            baseDir: "../dist",
            index: 'index.html'
        },
        open: true
    })
    cb()
}

async function devCompile(){
    const bundle =  await rollup.rollup({
        input: '../devMode/main.ts',
        plugins: [
            rollupCommonjsPlugin(),
            nodeResolve({
                browser: true
            }),
            rollupTypescriptPlugin(),
            rollupBabelPlugin({
                babelHelpers: 'runtime',
                exclude: 'node_modules/**',
                presets: ["@babel/preset-react"],
                plugins: ['@babel/plugin-transform-runtime']
            }),
            rollupReplacePlugin({
                'process.env.NODE_ENV': JSON.stringify('production'),
                umd: ''
            })
        ]
    })
    await bundle.write({
        file: '../dist/bundle.js',
        footer: 'umd',
        moduleName: false
    })
}

function devWatch(){
    watch(['../devMode/**/*.ts', '../devMode/**/*.tsx', '../src/**/*.ts'], async function(cb){
        await devCompile()
        browserSync.reload()
        cb()
    })
}
task('dev', series(clear, initDev, devCompile, devWatch))