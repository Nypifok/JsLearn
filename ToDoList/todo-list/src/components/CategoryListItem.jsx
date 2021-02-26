import React from "react";
import edit from "../icons/create-24px.svg";
import remove from "../icons/delete-black-18dp.svg";

export default class CategoryListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onCategoryDeleted = this.onCategoryDeleted.bind(this);
    this.onCategoryEdited = this.onCategoryEdited.bind(this);
  }
  onCategoryDeleted() {
    this.props.showDeleteModal(this.props.id);
  }
  onCategoryEdited() {
    this.props.showEditModal(this.props.id);
  }
  render() {
    return (
      <div className="list-item" key={this.props.key}>
        <span className="list-item-title">{this.props.title}</span>
        <img
          className="remove-icon"
          src={remove}
          alt="Remove"
          onClick={this.onCategoryDeleted}
        />
        <img
          className="edit-icon"
          src={edit}
          alt="Edit"
          onClick={this.onCategoryEdited}
        />
        <div className="list-item-description">{this.props.description}</div>
      </div>
    );
  }
}
