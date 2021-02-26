import React from "react";
import { connect } from "react-redux";
import edit from "../icons/create-24px.svg";
import category from "../icons/folder-black-18dp.svg";
import remove from "../icons/delete-black-18dp.svg";

export class TaskListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onTaskDeleted = this.onTaskDeleted.bind(this);
    this.onTaskEdited = this.onTaskEdited.bind(this);
  }
  haveCategory() {
    let categoryItem = this.props.categories
      .filter((item) => item.id == this.props.category)
      .shift();

    if (this.props.category && categoryItem) {
      return true;
    } else {
      return false;
    }
  }
  getCategoryTitle() {
    let categoryItem = this.props.categories
      .filter((item) => item.id == this.props.category)
      .shift();

    if (categoryItem) {
      return categoryItem.title;
    }
  }
  onTaskDeleted() {
    this.props.showDeleteModal(this.props.id);
  }
  onTaskEdited() {
    this.props.showEditModal(this.props.id);
  }
  render() {
    return (
      <div className="list-item" key={this.props.id}>
        <span className="list-item-title">{this.props.title}</span>
        <img
          className="remove-icon"
          src={remove}
          alt="Remove"
          onClick={this.onTaskDeleted}
        />
        <img
          className="edit-icon"
          src={edit}
          alt="Edit"
          onClick={this.onTaskEdited}
        />
        {this.haveCategory() === true ? (
          <div>
            <img className="category-icon" src={category} alt="Category" />
            <span className="list-item-category-title">
              {this.getCategoryTitle()}
            </span>
          </div>
        ) : null}

        <div className="list-item-description">{this.props.description}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => state.category;
export default connect(mapStateToProps, null)(TaskListItem);
