import React from "react";

export class TextInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="text-input">
        <span className="text-input-title">
          {this.props.title}
          {this.props.isRequired === true ? (
            <span className="text-input-required">*</span>
          ) : null}
        </span>

        <textarea
          className="text-input-field"
          defaultValue={this.props.defaultValue}
          type="text"
          maxLength={this.props.maxLength}
          placeholder={this.props.placeholder}
          onChange={(e) => this.props.onChange(e.target.value)}
        ></textarea>
      </div>
    );
  }
}
