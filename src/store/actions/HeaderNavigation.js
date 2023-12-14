import ENV from '../../config/env';
import { displayNotification } from './Notifier';
import {
  GET_ALL_COUNTRY_DETAILS,
  CHANGE_COUNTRY_DETAILS,
  CLEAR_SELECTED_COUNTRY,
  SELECT_COUNTRY
} from '../constants/HeaderNavigation';

const getAllCountries = () => {
  const api = ENV.COUNTRY_API_URL;
  return async dispatch => {
    await fetch(api + '/all?fields=name,cca3')
      .then(res => res.json())
      .then(result => {
        return dispatch(processCountries(result));
      })
      .catch(error => {
        dispatch(displayNotification('Request Country List - Unexpected error occured.', 'error'))
      });
  };
};

const selectCountry = (countryId) => {
  const api = ENV.COUNTRY_API_URL;
  return async dispatch => {
    await fetch(api + '/alpha/' + countryId)
      .then(res => res.json())
      .then(result => {
        return dispatch(selectedCountryDetails(result));
      })
      .catch(error => {
        console.log("5");
        dispatch(displayNotification('Request Details - Unexpected error occured.', 'error'))
      });
  };
}

const processCountries = countries => {
  let result = countries.map((obj) => ({ id: obj.cca3, company: obj.name.official  }))  
  return {
    type: GET_ALL_COUNTRY_DETAILS,
    countries: result
  };
};

const changeCountryDetails = countryDetails => {
  return {
    type: CHANGE_COUNTRY_DETAILS,
    countryDetails
  };
};

const selectedCountryDetails = countryDetails => {
  let result = countryDetails.map((obj) => ({ code: obj.cca3, name: obj.name.official, currency : obj.currencies, flag: obj.flags, coatOfArms: obj.coatOfArms,  car: obj.car   }))  
  return {
    type: SELECT_COUNTRY,
    countryDetails: result
  };
};

const clearSelectedCountry = () => {
  return {
    type: CLEAR_SELECTED_COUNTRY
  };
};

export {
  getAllCountries,
  processCountries,
  changeCountryDetails,
  clearSelectedCountry,
  selectCountry
};
