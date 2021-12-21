"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = require("react");

var useSaferState = function useSaferState(initState) {
  var _useState = (0, _react.useState)(initState),
      state = _useState[0],
      setState = _useState[1];

  var isUnMount = (0, _react.useRef)(false);
  (0, _react.useEffect)(function () {
    return function () {
      isUnMount.current = true;
    };
  }, []);

  function changeState(state) {
    if (!isUnMount.current) setState(state);
  }

  return [state, changeState];
};

var _default = useSaferState;
exports["default"] = _default;