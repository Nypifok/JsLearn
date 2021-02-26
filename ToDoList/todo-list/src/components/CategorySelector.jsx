import React from "react";

export default class CategorySelector extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="category-selector">
        <span className="text-input-title">
          {this.props.title}
          {this.props.isRequired === true ? (
            <span className="text-input-required">*</span>
          ) : null}
        </span>
        <select onChange={(e) => this.props.onChange(e.target.value)}>
          {this.props.children}
        </select>
      </div>
    );
  }
}
