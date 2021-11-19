### react-rough-utils
___
这是一个简单的工具包，包含一定的js函数 和 部分react-hook 。  
支持ts，内置 .d.ts 文件。  
##### 安装
```
    npm i react-rough-utils
        /
    yarn add react-rough-utils
```
##### 使用
```  
    import {Utils, Hooks} from 'react-rough-utils'  
// Utils对象具有 js 函数  
    const {} = Utils  
// Hooks对象具有 react-hook 函数  
    const {} = Hooks
```  

##### Hooks
- useSaferState：安全的useState，防止组件卸载报错
- useCountdownSecond: 倒计时hook

###### useSaferState
一个安全的useState，保证在当前组件卸载后 不会再进行 更新状态
```
    import {Utils, Hooks} from 'react-rough-utils' 
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
- Observer: 一个构造函数，可以充当一个简单的 vue/react 简单的状态通信装置
- objTransformUrlSearch: 将传入的obj，转换为 url 格式的 search 返回
- urlSearchTransformObj: 将传入的search，转换为 obj 格式返回
- hashScrollToId: 根据 url的hash，滚动到 id 对应 hash 的元素。<element id='hash' ...>
- clearUrlHash: 清除当前页面url的hash，不刷新页面
- clearUrlSearch: 清除当前页面url的search，不刷新页面

###### Observer
一个构造函数，可以充当一个简单的 vue/react 简单的状态通信装置
（ 如果需要 可以提 issues ）

```
    import {Utils} from 'react-rough-utils'
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
    import {Utils} from 'react-rough-utils'
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

###### hashScrollToId
根据当前 url#hash 滚动到对应的 <element id='hash' ...>
```
    // 真实情况，可能不是这样。可能出现路由跳转后 滚动的情况
    // 否则 使用 a.href 就能实现
    html
        <button>scroll</button>
        <div style='height: 1000px'></div>
        <div id='test'></div>
    js
        document.querySelector('button').onclick(()=>{
            window.history.pushState({}, '', `${window.location.href}#test`)
            hashScrollToId()
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
