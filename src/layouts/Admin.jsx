/* eslint-disable */
import React from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import ClassNames from "classnames"
// core components
import Navbar from "components/Navbars/Navbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import routes from "routes.js";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import image from "assets/img/sidebar-2.jpg";
import pageLogo from '../assets/icons/logo-BF.svg';
import { getAllCountries } from "../store/actions/HeaderNavigation";
import { Button } from "@material-ui/core";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
    })}
  </Switch>
);

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: image,
      color: "blue",
      hasImage: true,
      fixedClasses: "dropdown show",
      mobileOpen: false
    };
  }

  handleImageClick = image => {
    this.setState({ image: image });
  };

  handleColorClick = color => {
    this.setState({ color: color });
  };

  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  getRoute() {
    return this.props.location.pathname !== "/admin/maps";
  }

  componentDidMount() {
    this.props.getAllCountries();

    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Button
          className={
            ClassNames({
              [classes.expandButton]: !this.state.mobileOpen,
              [classes.collapseButton]: this.state.mobileOpen,
            })
          }
          onClick={() => this.handleDrawerToggle()}
        ></Button>
        <div className={classes.wrapper}>
          <Sidebar
            routes={routes.filter(r => r.layout === '/admin')}
            logoText={"Logo"}
            logo={pageLogo}
            image={this.state.image}
            handleDrawerToggle={this.handleDrawerToggle}
            open={this.state.mobileOpen}
            color={this.state.color}
            {...rest}
          />
          <div className={this.state.mobileOpen ? classes.mainPanel : classes.mainPanel2} ref="mainPanel">
            <Navbar
              routes={routes}
              handleDrawerToggle={this.handleDrawerToggle}
              {...rest}
            />
            {this.getRoute() ? (
              <div className={classes.content}>
                <div className={classes.container}>{switchRoutes}</div>
              </div>
            ) : (
              <div className={classes.map}>{switchRoutes}</div>
            )}
            {this.getRoute() ? <Footer /> : null}
          </div>
        </div>
      </div>
    );
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    getAllCountries: () => {
      dispatch(getAllCountries());
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(dashboardStyle)(Admin));
