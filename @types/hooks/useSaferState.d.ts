type useSaferState = <T>(initState: T)=> [T, (newState: T) => void]

export default useSaferState
