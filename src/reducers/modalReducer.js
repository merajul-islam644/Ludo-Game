export const initialModalState = {
  activeModal: null,
};

export const modalReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        activeModal: action.payload,
      };

    case "CLOSE_MODAL":
      return {
        ...state,
        activeModal: null,
      };
  }
};
