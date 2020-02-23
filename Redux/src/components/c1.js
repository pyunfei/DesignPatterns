import React from 'react';
import { connect } from '../react-redux';
import action from '../store/actions/c1';

function C1(props) {
  return (<div>
    {props.number}
    <button onClick={() => props.increment(9)}>+</button>
  </div>)
}

export default connect(state => state.C1, action)(C1);