import React from "react";
import { connect } from "react-redux";
import { addCategory, removeCategory } from "../category/categorySlice";
import CustomModal from "./CustomModal";
import TaskListItem from "./TaskListItem";
export class CategoryView extends React.Component {
  constructor(props) {
    super(props);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
    this.state = { deleteModal: false, itemToDelete: 1 };
  }
  deleteCategory(id) {
    this.state.itemToDelete = id;
    this.setState({ deleteModal: true });
  }
  onDeleteConfirm(id) {
    this.setState({ deleteModal: false });
    this.props.removeCategory(id);
  }
  render() {
    return (
      <div className="category-view">
        {this.state.deleteModal ? (
          <CustomModal
            title="Удаление задачи"
            confirmMessage={
              "Вы уверены, что хотите удалить категорию" +
              this.props.categories
                .map((item) => item.title)
                .indexOf(this.state.itemToDelete)
            }
            itemId={this.state.itemToDelete}
            onConfirm={this.onDeleteConfirm}
            onCancel={() => this.setState({ deleteModal: false })}
            confirmText="Да"
            cancelText="Нет"
            onClose={() => this.setState({ deleteModal: false })}
          />
        ) : null}
        <ul className="category-list">
          {this.props.categories.map((item) => {
            return (
              <TaskListItem
                title={item.title}
                description={item.description}
                key={item.id}
                id={item.id}
                showDeleteModal={this.deleteCategory}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
const mapDispatch = { addCategory, removeCategory };
const mapStateToProps = (state) => state.category;
export default connect(mapStateToProps, mapDispatch)(CategoryView);
