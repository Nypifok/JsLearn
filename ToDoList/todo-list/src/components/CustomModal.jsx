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

          <div className="modal-inner-content">{this.props.children}</div>
          <div className="modal-buttons">
            <button
              className="modal-content-cancel"
              onClick={this.props.onCancel}
            >
              {this.props.cancelText}
            </button>
            <button
              className="modal-content-confirm"
              onClick={() => this.props.onConfirm(this.props.itemId)}
            >
              {this.props.confirmText}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
