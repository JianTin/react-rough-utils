import {observer} from '../../@types/utils/observer'

// 做到 订阅 和 通知
export default class Observer {
  state: observer.state
  event: observer.event
  constructor(init = {}) {
    this.state = init
    this.event = {}
  }
  // 获得当前值
  getState:observer.method['getState'] = (name) => {
    return this.state[name]
  }
  // 监听
  subscription:observer.method['subscription'] = (stateName, callback) => {
    let eventArray = this.event[stateName]
    if (!Array.isArray(eventArray)) {
      eventArray = []
      this.event[stateName] = eventArray
    }
    eventArray.push(callback)
    return callback
  }
  // 触发监听
  notify:observer.method['notify'] = (stateName, newState) => {
    if (!this.state.hasOwnProperty(stateName)) {
        throw new Error('没有这个属性 需要初始化')
    }
    this.state[stateName] = newState
    const bindArray = this.event[stateName]
    if (bindArray) bindArray.forEach((fn) => fn(newState))
  }
  // 卸载
  untie:observer.method['untie'] = (stateName, callback) => {
    const array = this.event[stateName]
    if (!Array.isArray(array)) return
    const indexOf = array.indexOf(callback)
    array.splice(indexOf, 1)
  }
}