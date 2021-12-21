"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = require("react");

var _index = require("./index");

var useCountdownSecond = function useCountdownSecond(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$timeoutInterval = _ref.timeoutInterval,
      timeoutInterval = _ref$timeoutInterval === void 0 ? 1000 : _ref$timeoutInterval,
      _ref$finishCallback = _ref.finishCallback,
      finishCallback = _ref$finishCallback === void 0 ? function () {} : _ref$finishCallback;

  // 基本信息
  var startDate = (0, _react.useRef)(0);
  var endDate = (0, _react.useRef)(0);
  var remainSecond = (0, _react.useRef)(0); // 倒计时

  var _useSaferState = (0, _index.useSaferState)(0),
      reciprocal = _useSaferState[0],
      setReciprocal = _useSaferState[1]; // 是否倒计时已经结束


  var isReciprocalClose = (0, _react.useRef)(true); // 是否暂停

  var isPause = (0, _react.useRef)(false); // 开始倒计时

  function stratReciprocal(reciprocalSecond) {
    cleanReciprocal();
    endDate.current = new Date().valueOf() + reciprocalSecond * 1000;
    isReciprocalClose.current = false;
    setReciprocal(reciprocalSecond);
    reciprocalEvent();
  } // 运行倒计时


  function reciprocalEvent() {
    setTimeout(function () {
      startDate.current = new Date().valueOf();
      var currentEndDate = endDate.current;
      var currentStartDate = startDate.current;
      if (isPause.current) return; // 对比

      if (currentEndDate >= currentStartDate) {
        // 获取最新的 倒计时 更新
        var newReciprocalData = Math.round((currentEndDate - currentStartDate) / 1000);
        setReciprocal(newReciprocalData);
        reciprocalEvent();
      } else {
        isReciprocalClose.current = true;
        finishCallback();
        return setReciprocal(0);
      }
    }, timeoutInterval);
  } // 清除倒计时
  // 进行init


  function cleanReciprocal() {
    isPause.current = false;
    isReciprocalClose.current = true;
    endDate.current = 0;
    startDate.current = 0;
    remainSecond.current = 0;
    setReciprocal(0);
  } // 停止倒计时
  // 保存当前剩下的秒数


  function pauseReciprocal() {
    var currentEndDate = endDate.current;
    var currentStartDate = startDate.current;

    if (currentEndDate !== 0 && currentEndDate > currentStartDate) {
      isPause.current = true;
      remainSecond.current = Math.round((currentEndDate - currentStartDate) / 1000);
    }
  } // 继续倒计时


  function continueReciprocal() {
    if (endDate.current > 0 && isPause.current) {
      endDate.current = new Date().valueOf() + remainSecond.current * 1000;
      isPause.current = false;
      reciprocalEvent();
    }
  }

  return {
    reciprocal: reciprocal,
    stratReciprocal: stratReciprocal,
    pauseReciprocal: pauseReciprocal,
    continueReciprocal: continueReciprocal,
    cleanReciprocal: cleanReciprocal,
    isReciprocalClose: isReciprocalClose.current,
    isPause: isPause.current
  };
};

var _default = useCountdownSecond;
exports["default"] = _default;