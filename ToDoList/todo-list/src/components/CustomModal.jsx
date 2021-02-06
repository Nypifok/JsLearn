import React from "react";

export default class CustomModal extends React.Component {
  render() {
    return (
      <div className="modal">
        <div className="modal-content">
          <h1 className="modal-title">{this.props.title}</h1>
          <button className="modal-content-button">X</button>
          <div className="modal-inner-content">{this.props.children}</div>
        </div>
      </div>
    );
  }
}
