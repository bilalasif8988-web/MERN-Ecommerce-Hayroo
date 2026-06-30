import { createContext } from "react";

export const HomeContext = createContext();

export const homeState = {
  categoryListDropdown: false,
  products: null,
  loading: false,
  sliderImages: [],
};

export const homeReducer = (state, action) => {
  switch (action.type) {
    case "categoryListDropdown":
      return {
        ...state,
        categoryListDropdown: action.payload,
      };

    case "setProducts":
      return {
        ...state,
        products: action.payload,
      };

    case "loading":
      return {
        ...state,
        loading: action.payload,
      };

    case "sliderImages":
      return {
        ...state,
        sliderImages: action.payload,
      };

    default:
      return state;
  }
};