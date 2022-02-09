type decideRun = (isRun: boolean)=>void
type urlRunExtensions = (
    extraUrl: string[], cb: decideRun, windowId?: number
)=>void

export default urlRunExtensions