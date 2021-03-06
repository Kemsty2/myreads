import React from "react";

class Loader extends React.Component {
  render() {
    return (
      <div className="lds-ring" style={this.props.style}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default Loader;
