import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import {
  getAllCountries,
  changeCountryDetails,
  clearSelectedCountry,
  selectCountry
} from '../../store/actions/HeaderNavigation';
import { fade } from '@material-ui/core/styles/colorManipulator';


function renderInputComponent(inputProps, { ...props }) {
  const { classes, inputRef = () => { }, ref, ...other } = inputProps;

  return (
    <FormControl style={{ width: "90%" }}>
      <TextField
        fullWidth
        InputProps={{
          inputRef: node => {
            ref(node);
            inputRef(node);
          },
          classes: {
            input: classes.input
          }
        }}
        {...other}
      />
    </FormControl>
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.company, query);
  const parts = parse(suggestion.company, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          )
        )}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value, countries) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  let regex = new RegExp(inputValue, 'gi');
  return inputLength === 0
    ? []
    : countries.filter(suggestion => {
      const keep = count < 5 && regex.test(suggestion.company);

      if (keep) {
        count += 1;
      }

      return keep;
    });
}

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    position: 'relative'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
    width: '100%'
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  divider: {
    height: theme.spacing(2)
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.75),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },

});

class IntegrationAutosuggest extends Component {
  state = {
    single: '',
    popper: '',
    suggestions: [],
    selectedSuggestion: []
  };

  countryList = [];

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.countries)
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue
    });

    if (newValue.trim() === '') {
      this.props.clearSelectedCountry();
    }
  };

  getSuggestionValue(suggestion) {
    if (suggestion) {
      this.props.selectCountry(suggestion.id);
    }

    return suggestion.company;
  }

  updateCountryListLocal() {
    const nameList = [];
    this.props.countries.forEach(country => {
      const countryItem = {
        id: country.id,
        company: country.company
      };
      nameList.push(countryItem);
    });

    this.setState({ countries: nameList });
  }

  sortCountries(a, b) {
    const nameA = a.label.toUpperCase();
    const nameB = b.label.toUpperCase();

    let comparison = 0;

    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }

    return comparison;
  }

  componentDidMount() {

  }

  render() {
    const {
      classes,
      inputProps,
      countries
    } = this.props;

    this.countryList = countries;

    const autosuggestProps = {
      ...inputProps,
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue: event => this.getSuggestionValue(event),
      renderSuggestion
    };

    return (
      <div className={classes.search}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: 'Search',
            value: this.state.single,
            onChange: this.handleChange('single')
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
      </div>
    );
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
  changeCountryInformation: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    countries: state.headerNavigation.countries,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllCountries: () => {
      dispatch(getAllCountries());
    },

    changeCountryInformation: countryDetails => {
      dispatch(changeCountryDetails(countryDetails));
    },

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
)(withStyles(styles)(IntegrationAutosuggest));
