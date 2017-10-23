// @flow
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Header from './../containers/Header';
import Landing from './Landing';
import * as actions from './../redux/actions/actions';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

// type props = {
//   fetchUser:
// }

type Props = {
  fetchUser: Function,
};

class App extends Component<Props> {
  componentDidMount () {
    this.props.fetchUser ();
  }

  render () {
    return (
      <div className="container">
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/surveys" component={Dashboard} />
              <Route path="/surveys/new" component={SurveyNew} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default connect (null, actions) (App);
