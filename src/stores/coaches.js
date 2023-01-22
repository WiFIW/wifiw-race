import { createStore } from 'redux';
// import rootReducer from './reducer';

const statsReducer = (state, action) => {
  switch (action) {
    case 'RECEIVE_STATS':
      return {
        ...state,
        recebeuStats: true,
      }

    default:

      break;
  }
}

const store = createStore(statsReducer);

export default store;