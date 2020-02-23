import React from 'react';
import { connect } from '../react-redux';
import action from '../store/actions/c2';

function C2(props) {
  return (<div>
    {props.number}
    <button onClick={() => props.decrement(9)}>-</button>
  </div>)
}

export default connect(state => state.C2, action)(C2);