import { useState, useRef, useEffect } from 'react';

var useSaferState = function useSaferState(initState) {
  var _useState = useState(initState),
      state = _useState[0],
      setState = _useState[1];

  var isUnMount = useRef(false);
  useEffect(function () {
    return function () {
      isUnMount.current = true;
    };
  }, []);

  function changeState(state) {
    if (!isUnMount.current) setState(state);
  }

  return [state, changeState];
};

export default useSaferState;