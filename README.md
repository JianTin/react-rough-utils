### rough-react-utils
___
这是一个简单的工具包，包含一定的js函数 和 部分react-hook 。  
支持ts，内置 .d.ts 文件。  
支持 webpack、rough 的 tree shaking。只打包你使用的代码。
##### 安装
```
    npm i rough-react-utils
        /
    yarn add rough-react-utils
```
##### 使用
```  
    import {Utils, Hooks} from 'rough-react-utils'  
// Utils对象具有 js 函数  
    const {} = Utils  
// Hooks对象具有 react-hook 函数  
    const {} = Hooks
```  

##### Hooks
___
- useSaferState：安全的useState，防止组件卸载报错
- useCountdownSecond: 倒计时hook

###### useSaferState
一个安全的useState，保证在当前组件卸载后 不会再进行 更新状态
```
    import {Utils, Hooks} from 'rough-react-utils' 
    const {useSaferState} = Hooks
    export default function(){
        const [count, setCount] = useSaferState(0)
        ...
    }
```
###### useCountdownSecond
这是一个倒计时hook。通过setTimeout间隔，判断 当前时间 距离 设置秒数时间 还有多少秒
```
    ...
    // 可直接使用的例子
    export default function(){
        // 通常需要用到的 只有 reciprocal 和 stratReciprocal
        const {
            reciprocal, // number --- 当前剩余倒计时，0 代表倒计时结束
            stratReciprocal,// (second: number)=>void --- 开启倒计时。 second 代表要倒计时的秒数
            pauseReciprocal,// ()=>void --- 停止倒计时，会保存 剩下的倒计时
            continueReciprocal,// ()=>void --- 继续剩下时间的倒计时
            cleanReciprocal, // ()=>void --- 清除倒计时（大概率用不到）
            isReciprocalClose, // boolean --- 倒计时是否结束
            isPause // boolean --- 是否停止倒计时
        } = useCountdownSecond({
            timeoutInterval: 1000, // setTimeout 每次间隔。默认 1000 毫秒，可不传递
            finishCallback: ()=>{} // 倒计时结束，触发的函数。可不传递
        })
        return <>
        <div>{ reciprocal === 0 ? '可发送邮件' : `还剩下${reciprocal}可发送邮件` }</div>
        <button onClick={ ()=>stratReciprocal(30) } 
                disabled={ reciprocal === 0 ? false : true } 
        > 发送邮件 </button>
        </>
    }
```

##### Utils
___
- Observer: 一个构造函数，可以充当一个简单的 vue/react 简单的状态通信装置
- objTransformUrlSearch: 将传入的obj，转换为 url 格式的 search 返回
- urlSearchTransformObj: 将传入的search，转换为 obj 格式返回
- hashScrollToId: 根据 url的hash，滚动到 id 对应 hash 的元素。<element id='hash' ...>
- clearUrlHash: 清除当前页面url的hash，不刷新页面
- clearUrlSearch: 清除当前页面url的search，不刷新页面
- urlRunExtensions: 判断扩展 是否可以运行在该url上

###### Observer
一个构造函数，可以充当一个简单的 vue/react 简单的状态通信装置
（ 如果需要 可以提 issues ）

```
    import {Utils} from 'rough-react-utils'
    const {Observer} = Utils
    const {getState, subscription, notify, untie} = new Observer(init)
        init: 对象，代表初始化数据
        getState: (stateName: string)=>any 
            返回当前 stateName 对应的value
        subscription: (stateName: string, callback: (newState: any)=>{} )=> (newState: any)=>{}
            订阅该stateName ，notify 触发时调用订阅的函数。返回订阅使用的函数，可用于解绑。
            可以多次订阅。
        notify: (stateName: string, newState: any)=>void
            修改 stateName，并触发 订阅的函数。
        untie: (stateName: string, untieCallback: Function )=>void
            可以使用 subscription 返回的函数，进行调用 解绑。
```

```
    // 一个例子
    import {Utils} from 'rough-react-utils'
    const {Observer} = Utils
    const observer = new Observer({
        text: '123'
    })
    console.log( observer.getState('text') )
    observer.subscription('text', (newText)=>{
        console.log(`监听函数1： 触发了${newText}`) 
    })
    const fn2 = observer.subscription('text', (newText)=>{
        console.log(`监听函数2：触发了${newText}`) 
    })
    observer.subscription('text', (newText)=>{
        console.log(`监听函数3：触发了${newText}`) 
    })
    observer.untie('text', fn2)
    observer.notify('text', 'hello word')
    console.log( observer.getState('text') )
    
    // 123
    // 监听函数1： 触发了hello word
    // 监听函数3： 触发了hello word
    // hello word
```

###### objTransformUrlSearch
将 obj 转换为 url search
```
    const search = objTransformUrlSearch({
        a: 123,
        b: 321
    })
    console.log( search ) // ?a=123&b=321
```

###### urlSearchTransformObj  
将 url search 转换为 obj  
```
    const obj = urlSearchTransformObj('?a=123&c=321')
    console.log( obj ) // {a: 123, c: 321}
```

###### scollToId
传入 id 滚动到对应的dom
```
    html
        <button>scroll</button>
        <div style='height: 1000px'></div>
        <div id='test'></div>
    js
        document.querySelector('button').onclick(()=>{
            hashScrollToId('test')
        })
```
###### clearUrlHash
清除当前页面url的hash，不刷新页面
```
    // http://a.com#test -> http://a.com
    clearUrlHash()
```
###### clearUrlSearch
清除当前页面url的search，不刷新页面
```
    // http://a.com?a=123 -> http://a.com
    clearUrlHash()
```

###### urlRunExtensions
判断 当前扩展是否可运行于当前url  (chrome extension 专用)  
参数说明：  
```
    // 默认内置 ['chrome.google.com', 'chrome://']
        // 说明： chrome.google.com -> https://chrome.google.com/webstore/category/extensions?hl=en
        // chrome:// -> chrome://version、chrome://history ...
        // chrome.google.com 检索的是 chrome扩展商店。chrome:// 检索的则是chrome 内置页面
    urlRunExtensions = (
        // 额外增加检索的页面。如果不需要，传 []
        extraUrl: string[], 
        // 检索后的响应。 isRun --- true: 可以运行。false: 不可以运行
        cb: (isRun: boolean)=>void,
        // 如果在 background.js 运行，那最好传递 windowId。否则可能会返回fasle
        windowId?: number
    )=>void
```
例子：
```
    // 在 baidu.com、chrome内置页面、chrome扩展商店。isRun 均返回false
    urlRunExtensions(['baidu.com'], (isRun)=>{
        if(isRun){
            ...
        }
    })
```

