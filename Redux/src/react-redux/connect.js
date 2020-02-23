import React from 'react';
import { bindActionCreators } from '../redux'
import Context from './context';

function connect(mapStateToProps, mapDispatchToProps) {
  return function (WardComponent) {
    return class extends React.Component {
      static contextType = Context;
      constructor(props, context) {
        super(props);
        this.state = this.mapState = mapStateToProps(context.store.getState())
        if (typeof mapDispatchToProps === 'function') {
          this.actions = mapDispatchToProps(context.store.dispatch);
        } else if (typeof mapDispatchToProps === 'object') {
          this.actions = bindActionCreators(mapDispatchToProps, context.store.dispatch);
        }
      }
      componentDidMount() {
        this.unsubscribe = this.context.store.subscribe(() => {
          // combineReducer 优化每个reducer是否都发生了派发改变 prev/next
          // 使用变量存储每次传入的值与之前的做比较
          let nextState = mapStateToProps(this.context.store.getState());
          if (nextState !== this.mapState) {
            this.mapState = nextState // 如果不相同 得赋值覆盖否则永远就是第一次的值
            this.setState(nextState)
          }
        })
      }
      componentWillUnmount() {
        this.unsubscribe()
      }
      render() {
        return <WardComponent {...this.props} {...this.state} {...this.actions} />
      }
    }
  }
}

export default connect;