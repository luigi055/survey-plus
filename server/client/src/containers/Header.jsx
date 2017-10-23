// @flow
import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Payments from './../components/Payments';

/* eslint-disable*/
class Header extends Component {
  renderSignIn () {
    const {auth} = this.props;
    switch (auth) {
      case null:
        return; // avoid flash style issue
      case false:
        return <li><a href="/auth/google">Signin with Google</a></li>;
      default:
        return [
          <li key="1"><Payments /></li>,
          <li key="2" style={{margin: '0 10px'}}>
            Credits: {auth.credits}
          </li>,
          <li key="3"><a href="/api/logout">Logout</a></li>,
        ];
    }
  }
  render () {
    return (
      <nav className="nav-extended">
        <div className="nav-wrapper">
          <Link to={this.props.auth ? '/surveys' : '/'} className="brand-logo">
            Emaily
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <NavLink to="/surveys" activeClassName="active">
                Surveys
              </NavLink>
            </li>
            <li>
              <NavLink to="/surveys/new" activeClassName="active">
                Create New
              </NavLink>
            </li>
            {this.renderSignIn ()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({auth}) {
  return {
    auth,
  };
}

export default connect (mapStateToProps) (Header);
