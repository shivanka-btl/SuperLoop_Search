import {
  GET_ALL_COUNTRY_DETAILS,
  CHANGE_COUNTRY_DETAILS,
  CLEAR_SELECTED_COUNTRY,
  SELECT_COUNTRY
} from '../constants/HeaderNavigation';

const headerNavigation = (
  state = {
    countries: [],
    countryDetails: {}
  },
  action
) => {
  switch (action.type) {
    case GET_ALL_COUNTRY_DETAILS:
      return Object.assign({}, state, {
        countries: action.countries
      });

    case CHANGE_COUNTRY_DETAILS:
      return Object.assign({}, state, {
        countryDetails: action.countryDetails
      });

    case CLEAR_SELECTED_COUNTRY:
      return Object.assign({}, state, {
        countryDetails: {}
      });
    
    case SELECT_COUNTRY:
      return Object.assign({}, state, {
        countryDetails: action.countryDetails
      });

    default:
      return state;
  }
};

export default headerNavigation;
