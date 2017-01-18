const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}
function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}

function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

function incrementAsync(delay = 1000) {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}
module.exports={INCREMENT_COUNTER,DECREMENT_COUNTER,incrementAsync,incrementIfOdd,increment,decrement}