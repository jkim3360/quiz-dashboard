import React, { Component } from "react";
const { Provider, Consumer } = React.createContext();

class ApiProvider extends Component {
  render() {
    return <Provider value={"Day"}>{this.props.children}</Provider>;
  }
}

export { ApiProvider, Consumer as ApiContextConsumer };