const userReducers = (state={}, action) => {
  switch(action.type){
    case "ADD_USER_VIA_GOOGLE":
      return action.payload;

    case "LOGOUT":
     return {};

    default : return state;
  }
}

export default userReducers;
