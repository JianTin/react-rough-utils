import React,{useState} from "react";
import {useCountdownSecond} from '../src/hooks/index'
import {Hooks} from '../src/index'

export default function(){
    const {
        reciprocal, // number --- 当前剩余倒计时，0 代表倒计时结束
        stratReciprocal,// (second: number)=>void --- 开启倒计时。 second 代表要倒计时的秒数
        pauseReciprocal,// ()=>void --- 停止倒计时，会保存 剩下的倒计时
        continueReciprocal,// ()=>void --- 继续剩下时间的倒计时
        cleanReciprocal, // ()=>void --- 清除倒计时（大概率用不到）
        isReciprocalClose, // boolean --- 倒计时是否结束
        isPause // boolean --- 是否停止倒计时
    } = Hooks.useCountdownSecond({
        timeoutInterval: 500,
        finishCallback: ()=>{}
    })
    return <>
        <div>{ reciprocal === 0 ? '可发送邮件' : `还剩下${reciprocal}可发送邮件` }</div>
        <button onClick={ ()=>stratReciprocal(30) } 
            disabled={ reciprocal === 0 ? false : true } 
        > 发送邮件 </button>
    </>
}