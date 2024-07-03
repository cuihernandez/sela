// import {SET_PSALMS_DATA, SET_CURRENT_INDEX} from '../actions/types';

import {SET_PSALMS_DATA} from '../actions/types';

// const initialState = {
//   arrayData: [],
//   currentIndex: 0,
// };

// const psalmsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_PSALMS_DATA:
//       return {
//         ...state,
//         ...action.payload,
//       };
//     case SET_CURRENT_INDEX:
//       return {
//         ...state,
//         ...action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default psalmsReducer;

const initialState = {
  psalms: [],
  psalmsCount: 0,
};

const psalmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PSALMS_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default psalmsReducer;
