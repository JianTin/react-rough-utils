interface useParams {
    timeoutInterval?: number,
    finishCallback?: Function
}

type useCountdownSecond = (
    {timeoutInterval, finishCallback}?: useParams
)=>({
    reciprocal: number,
    stratReciprocal: (reciprocalSecond: number)=>void,
    pauseReciprocal: Function,
    continueReciprocal: Function,
    cleanReciprocal: Function,
    isReciprocalClose: boolean,
    isPause: boolean
})

export default useCountdownSecond