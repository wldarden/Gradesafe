import PropTypes from 'prop-types';
import React, {Component} from 'react';

export default class TransparentIndexPage extends Component {
  
  static get propTypes() {
    return {
      children: PropTypes.node
    };
  }
  
  render() {
		return React.cloneElement(this.props.children)
	}
}