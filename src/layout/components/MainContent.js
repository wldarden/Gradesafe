import PropTypes from 'prop-types';
import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {getCurrentUser, getRealUser} from '../../Users/utils'
import * as actions from '../../Users/actions'

export class MainContent extends React.Component {
  static get propTypes() {
    return {
      children: PropTypes.node,
      routes: PropTypes.array,
      params: PropTypes.object,
      user: PropTypes.object,
      realUser: PropTypes.object,
      restoreUser: PropTypes.func,
      push: PropTypes.func
    };
  }

  render () {


    return (
      <div className="page-content main-content" ref="pageContent">

        <div className="row">
          <div className="col-xs-12">
            <div className="row">
              <div className="col-xs-12">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const props = (state) => {
  return {
    user: getCurrentUser(state),
    realUser: getRealUser(state)
  }
}

export default connect(props, {...actions, push})(MainContent)
