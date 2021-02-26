import React from "react";
import { connect } from "react-redux";
import {
  addCategory,
  removeCategory,
  fetchCategories,
  updateCategory,
} from "../category/categorySlice";
import CategoryListItem from "./CategoryListItem";
import CustomModal from "./CustomModal";
import { TextInput } from "./TextInput";
export class CategoryView extends React.Component {
  constructor(props) {
    super(props);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.editCategory = this.editCategory.bind(this);
    this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
    this.onEditConfirm = this.onEditConfirm.bind(this);
    this.onCategoryTitleChanged = this.onCategoryTitleChanged.bind(this);
    this.onCategoryDescriptionChanged = this.onCategoryDescriptionChanged.bind(
      this
    );
    this.getCategory = this.getCategory.bind(this);
    this.state = { editModal: false, deleteModal: false, currentItem: 1 };
  }
  componentDidMount() {
    this.categoryUpdate = setInterval(() => this.props.fetchCategories(), 500);
  }
  componentWillUnmount() {
    clearInterval(this.categoryUpdate);
  }
  deleteCategory(id) {
    this.state.currentItem = id;
    this.setState({ deleteModal: true });
  }
  editCategory(id) {
    let category = this.getCategory(id);
    this.state.currentItem = id;
    this.setState({
      editModal: true,
      categoryTitle: category.title,
      categoryDescription: category.description,
    });
  }
  onEditConfirm(id) {
    if (this.state.categoryTitle.length > 0) {
      this.setState({ editModal: false });
      this.props.updateCategory({
        id,
        title: this.state.categoryTitle,
        description: this.state.categoryDescription,
      });
    } else {
      alert("Имя категории является обязательным полем!");
    }
  }
  onDeleteConfirm(id) {
    this.setState({ deleteModal: false });
    this.props.removeCategory(id);
  }
  onCategoryTitleChanged(title) {
    this.setState({ categoryTitle: title });
  }
  getCategory(id) {
    return this.props.categories.filter((item) => item.id === id).shift();
  }
  onCategoryDescriptionChanged(description) {
    this.setState({ categoryDescription: description });
  }
  render() {
    return (
      <div className="category-view">
        {this.state.deleteModal ? (
          <CustomModal
            title="Удаление категории"
            confirmMessage={
              "Вы уверены, что хотите удалить категорию" +
              this.props.categories
                .map((item) => item.title)
                .indexOf(this.state.currentItem)
            }
            itemId={this.state.currentItem}
            onConfirm={this.onDeleteConfirm}
            onCancel={() => this.setState({ deleteModal: false })}
            confirmText="Да"
            cancelText="Нет"
            onClose={() => this.setState({ deleteModal: false })}
          />
        ) : null}
        {this.state.editModal ? (
          <CustomModal
            title="Редактирование категории"
            itemId={this.state.currentItem}
            onConfirm={this.onEditConfirm}
            onCancel={() =>
              this.setState({
                editModal: false,
                categoryTitle: "",
                categoryDescription: "",
              })
            }
            confirmText="Сохранить"
            cancelText="Закрыть"
            onClose={() =>
              this.setState({
                editModal: false,
                categoryTitle: "",
                categoryDescription: "",
              })
            }
          >
            <TextInput
              maxLength="255"
              placeholder="Введите имя категории"
              title="Имя"
              isRequired={true}
              defaultValue={this.getCategory(this.state.currentItem).title}
              onChange={this.onCategoryTitleChanged}
            ></TextInput>
            <TextInput
              maxLength="512"
              placeholder="Введите описание категории"
              title="Описание"
              defaultValue={
                this.getCategory(this.state.currentItem).description
              }
              onChange={this.onCategoryDescriptionChanged}
            ></TextInput>
          </CustomModal>
        ) : null}
        <ul className="category-list">
          {this.props.categories.map((item) => {
            return (
              <CategoryListItem
                title={item.title}
                description={item.description}
                key={item.id}
                id={item.id}
                showDeleteModal={this.deleteCategory}
                showEditModal={this.editCategory}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
const mapDispatch = {
  addCategory,
  removeCategory,
  fetchCategories,
  updateCategory,
};
const mapStateToProps = (state) => state.category;
export default connect(mapStateToProps, mapDispatch)(CategoryView);
