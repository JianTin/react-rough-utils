export namespace observer {
    interface state {
        [key: string]: any
    }
    export interface event {
        [key: string]: Array<(newState: any) => void>
    }
    export interface method {
        getState<stateType = any>(keyName: string):stateType
        subscription<newStateType = any>(keyName: string, callback: (newState: newStateType)=>void ):(newState: newStateType)=>void
        notify<newState = any>(keyName: string, newState: newState)
        untie(keyName: string, callback: (newState?: any)=>void):void
    }
}

export default class Observer{
    new (): Observer
    state: observer.state
    event: observer.event
    constructor(init?: observer.state)
    getState: observer.method['getState']
    subscription: observer.method['subscription']
    notify: observer.method['notify']
    untie: observer.method['untie']
}