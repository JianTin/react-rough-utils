import React,{useRef} from "react";
import {default as useCountdownSecondType} from '../../@types/hooks/useCountdownSecond'
import {useSaferState} from './index'

const useCountdownSecond:useCountdownSecondType = function ({timeoutInterval = 1000, finishCallback = ()=>{}} = {}){
    // 基本信息
    const startDate = useRef<number>(0)
    const endDate = useRef<number>(0)
    const remainSecond = useRef<number>(0)
    // 倒计时
    const [reciprocal, setReciprocal] = useSaferState<number>(0)
    // 是否倒计时已经结束
    const isReciprocalClose = useRef<boolean>(true)
    // 是否暂停
    const isPause = useRef<boolean>(false)

    // 开始倒计时
    function stratReciprocal(reciprocalSecond: number){
        cleanReciprocal()
        endDate.current = (new Date()).valueOf() + reciprocalSecond * 1000
        isReciprocalClose.current = false
        setReciprocal(reciprocalSecond)
        reciprocalEvent()
    }

    // 运行倒计时
    function reciprocalEvent(){
        setTimeout(()=>{
            startDate.current = (new Date()).valueOf()
            const currentEndDate = endDate.current
            const currentStartDate = startDate.current
            if(isPause.current) return;
            // 对比
            if(currentEndDate >= currentStartDate){
                // 获取最新的 倒计时 更新
                const newReciprocalData = Math.round(((currentEndDate - currentStartDate) / 1000))
                setReciprocal(newReciprocalData)
                reciprocalEvent()
            } else {
                isReciprocalClose.current = true
                finishCallback()
                return setReciprocal(0)
            }
        }, timeoutInterval)
    }

    // 清除倒计时
    // 进行init
    function cleanReciprocal(){
        isPause.current = false
        isReciprocalClose.current = true
        endDate.current = 0
        startDate.current = 0
        remainSecond.current = 0
        setReciprocal(0)
    }

    // 停止倒计时
    // 保存当前剩下的秒数
    function pauseReciprocal(){
        const currentEndDate = endDate.current
        const currentStartDate = startDate.current
        if(currentEndDate !== 0 && currentEndDate > currentStartDate){
            isPause.current = true
            remainSecond.current = Math.round((currentEndDate - currentStartDate) / 1000)
        }
    }

    // 继续倒计时
    function continueReciprocal(){
        if(endDate.current > 0 && isPause.current){
            endDate.current = (new Date()).valueOf() + (remainSecond.current * 1000)
            isPause.current = false
            reciprocalEvent()
        }
    }

    return {
        reciprocal,
        stratReciprocal,
        pauseReciprocal,
        continueReciprocal,
        cleanReciprocal,
        isReciprocalClose: isReciprocalClose.current,
        isPause: isPause.current
    }
}

export default useCountdownSecond