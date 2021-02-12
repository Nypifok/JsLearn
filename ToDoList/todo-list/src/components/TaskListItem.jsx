import React from "react";
import edit from "../icons/create-24px.svg";
import category from "../icons/folder-black-18dp.svg";
import remove from "../icons/delete-black-18dp.svg";

export default class TaskListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onTaskDeleted = this.onTaskDeleted.bind(this);
  }
  onTaskDeleted() {
    this.props.showDeleteModal(this.props.id);
  }
  render() {
    return (
      <div className="list-item" key={this.props.key}>
        <span className="list-item-title">{this.props.title}</span>
        <img
          className="remove-icon"
          src={remove}
          alt="Remove"
          onClick={this.onTaskDeleted}
        />
        <img className="edit-icon" src={edit} alt="Edit" />
        <img className="category-icon" src={category} alt="Category" />
        <div className="list-item-description">{this.props.description}</div>
      </div>
    );
  }
}
