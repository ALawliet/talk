import React, {Component} from 'react';
import {getSlotElements} from 'coral-framework/helpers/plugins';

class Slot extends Component {
  render() {
    const {fill, ...rest} = this.props;
    return (
      <span>
        {getSlotElements(fill, rest)}
      </span>
    );
  }
}

Slot.propTypes = {
  fill: React.PropTypes.string
};

export default Slot;
