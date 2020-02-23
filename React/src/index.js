// import React from 'react';
// import ReactDOM from 'react-dom';
import React from './core';
let ReactDOM = React;

// let element = <div>
//   <h1>彭雲飛</h1>
//   <p>宇宙第一</p>
//   <a href="http://www.pengyunfei.top">blog</a>
// </div>

function App(props) {
  return <div>
    <h1>{props.title}</h1>
    <p>宇宙第一</p>
    <a href="http://www.pengyunfei.top">blog</a>
  </div>
}

let element = <App title="彭雲飛" />

ReactDOM.render(element, document.getElementById('root'))
