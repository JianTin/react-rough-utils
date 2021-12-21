"use strict";

exports.__esModule = true;
exports["default"] = void 0;

// 做到 订阅 和 通知
var Observer = function Observer(init) {
  var _this = this;

  if (init === void 0) {
    init = {};
  }

  this.state = void 0;
  this.event = void 0;

  this.getState = function (name) {
    return _this.state[name];
  };

  this.subscription = function (stateName, callback) {
    var eventArray = _this.event[stateName];

    if (!Array.isArray(eventArray)) {
      eventArray = [];
      _this.event[stateName] = eventArray;
    }

    eventArray.push(callback);
    return callback;
  };

  this.notify = function (stateName, newState) {
    if (!_this.state.hasOwnProperty(stateName)) {
      throw new Error('没有这个属性 需要初始化');
    }

    _this.state[stateName] = newState;
    var bindArray = _this.event[stateName];
    if (bindArray) bindArray.forEach(function (fn) {
      return fn(newState);
    });
  };

  this.untie = function (stateName, callback) {
    var array = _this.event[stateName];
    if (!Array.isArray(array)) return;
    var indexOf = array.indexOf(callback);
    array.splice(indexOf, 1);
  };

  this.state = init;
  this.event = {};
} // 获得当前值
;

exports["default"] = Observer;