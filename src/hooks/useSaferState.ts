import React,{useState, useRef, useEffect} from 'react'
import {default as useSaferStateType} from '../../@types/hooks/useSaferState'

const useSaferState: useSaferStateType = function<T>(initState: T) {
  const [state, setState] = useState<T>(initState)
  const isUnMount = useRef(false)
  useEffect(() => () => {
      isUnMount.current = true
  },[])
  function changeState(state: T) {
    if (!isUnMount.current) setState(state)
  }
  return [state, changeState]
}

export default useSaferState