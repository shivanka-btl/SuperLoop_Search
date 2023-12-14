import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";
import AutoSuggest from './IntegrationAutosuggest.jsx'
import { connect } from 'react-redux';
import { clearSelectedCountry, selectCountry } from "store/actions/HeaderNavigation";


class HeaderLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: []
    }
  }

  render() {
    const { selectedCountry } = this.props;
    return (
      <div>
        <AutoSuggest
          name="country"
          id="country"
          inputProps={{
            placeholder: selectedCountry ? selectedCountry.company : 'Country',
            inputProps: {
              "aria-label": "Country"
            }
          }}
          entity="countries"
          sugg_field="company"
          label={selectedCountry ? selectedCountry.company : 'Country'}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    countries: state.headerNavigation.countries,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearSelectedCountry: () => {
      dispatch(clearSelectedCountry());
    },

    selectCountry: country => {
      dispatch(selectCountry(country));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(headerLinksStyle)(HeaderLinks));
