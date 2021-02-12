import React from "react";

export default class CustomModal extends React.Component {
  render() {
    return (
      <div className="modal">
        <div className="modal-content">
          <h1 className="modal-title">{this.props.title}</h1>
          <button className="modal-content-button" onClick={this.props.onClose}>
            X
          </button>
          <h1 className="modal-message">{this.props.confirmMessage}</h1>
          <button
            className="modal-content-confirm"
            onClick={() => this.props.onConfirm(this.props.itemId)}
          >
            {this.props.confirmText}
          </button>
          <button
            className="modal-content-cancel"
            onClick={this.props.onCancel}
          >
            {this.props.cancelText}
          </button>
          <div className="modal-inner-content">{this.props.children}</div>
        </div>
      </div>
    );
  }
}
