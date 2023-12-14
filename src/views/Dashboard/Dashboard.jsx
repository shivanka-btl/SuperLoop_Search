import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/core/Icon';
// core components
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import Notifier from '../../components/Notification/Notifier';
import dashboardStyle from 'assets/jss/material-dashboard-react/views/dashboardStyle.jsx';
import { connect } from 'react-redux';
import { clearSelectedCountry } from '../../store/actions/HeaderNavigation';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selCountry: []
    }
  }

  get currencyDetails() {
    const { countryDetails } = this.props;
    let curr_key, curr_name, curr_symbol = '';

    if (countryDetails[0]) {
      const objky = Object.keys(countryDetails[0].currency);
      curr_key = countryDetails[0].currency[objky];
      curr_name = countryDetails[0].currency[objky].name;
      curr_symbol = countryDetails[0].currency[objky].symbol;
    }

    return {
      key: curr_key,
      name: curr_name,
      symbol: curr_symbol
    };
  }

  render() {
    const {
      classes,
      countryDetails,
    } = this.props;

    return (
      <div>
        <Notifier />
        <GridContainer>

          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Icon>explore</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Country</p>
                <h3 className={classes.cardTitle}>{countryDetails[0] ? countryDetails[0].name : ''}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Icon>public</Icon>
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Icon>payments</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Currency</p>
                <h3 className={classes.cardTitle}>{countryDetails[0] ? this.currencyDetails.name : ''}</h3>
              </CardHeader>
              <CardFooter stats>
                <div >
                  {'Code : '}
                  {countryDetails[0] ? Object.keys(countryDetails[0].currency) : ''}
                </div>
                <div>
                  {'Symbol : '}
                  {countryDetails[0] ? this.currencyDetails.symbol : ''}
                </div>

              </CardFooter>
            </Card>
          </GridItem>


          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>directions_car</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Car</p>
                <h3 className={classes.cardTitle}>{countryDetails[0] ? countryDetails[0].car.side.replace(/\b(\w)/g, k => k.toUpperCase()) : ''}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Icon>content_copy</Icon>
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={9} md={6}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>CoatOfArms</p>
                {countryDetails[0] ?
                  <img src={countryDetails[0].coatOfArms.png} alt="coat-of-arms" width="100%" height="100%" /> : ''}
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Icon>collections</Icon>
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={9} md={6}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Icon>flag_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Flag</p>
                <h3 className={classes.cardTitle}>
                  {countryDetails[0] ?
                    <img src={countryDetails[0].flag.png} width="100%" height="100%" alt={countryDetails[0].flag.alt} /> : ''}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Icon>photo_camera</Icon>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    countryDetails: state.headerNavigation.countryDetails,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearSelectedCountry: () => {
      dispatch(clearSelectedCountry());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(dashboardStyle)(Dashboard));