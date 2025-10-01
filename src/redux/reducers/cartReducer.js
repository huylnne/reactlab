
const initialState = {
    items: [],
  };
  
  export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CART':
        return { ...state, items: action.payload };
  
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload),
        };
  
      case 'UPDATE_QTY':
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, qty: action.payload.qty }
              : item
          ),
        };
  
      default:
        return state;
    }
  };