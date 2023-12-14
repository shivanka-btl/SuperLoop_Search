import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Router, Switch, Route } from "react-router-dom";
import routes from "./routes";
import history from "./history";

class App extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router history={history}>
            <div className="landing-main-div">
              <div className="detailsBodyHolder">
                <div className="landing-page-body">
                  <Suspense fallback={this.loading()}>
                    <Switch>
                      {routes.map((route, idx) => {
                        return route.component ? (
                          <Route
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            render={props => <route.component {...props} />}
                          />
                        ) : null;
                      })}
                    </Switch>
                  </Suspense>
                </div>
              </div>
            </div>
          </Router>
        </header>
      </div>
    );
  }
}

App.propTypes = {
  contracts: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    contracts: state.contracts.contracts
  };
};

export default connect(mapStateToProps)(App);
