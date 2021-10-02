import { SAVE, START_LOADING, END_LOADING } from "../../constants/ActionTypes";
const savePaynetMethodReducer = (
  state = { isLoading: true, selected: false, savePaynetMethod: [] },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

    case SAVE:
      return {
        ...state,
        selected: true,
        savePaynetMethod: [...state.savePaynetMethod, action.payload],
      };

    default:
      //   console.log(state);
      return state;
  }
};
export default savePaynetMethodReducer;
