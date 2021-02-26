import React from "react";
import { connect } from "react-redux";
import { changeCurrentListView } from "../app/appSlice";
import { addTask } from "../task/taskSlice";
import { addCategory } from "../category/categorySlice";
import { TASK_VIEW, CATEGORY_VIEW } from "../app/appSlice";
import CustomModal from "./CustomModal";
import { TextInput } from "./TextInput";
import CategorySelector from "./CategorySelector";
class FixedHeader extends React.Component {
  constructor(props) {
    super(props);
    this.setTaskListView = this.setTaskListView.bind(this);
    this.getCategoriesOptions = this.getCategoriesOptions.bind(this);
    this.onTaskTitleChanged = this.onTaskTitleChanged.bind(this);
    this.onTaskDescriptionChanged = this.onTaskDescriptionChanged.bind(this);
    this.onTaskCategoryChanged = this.onTaskCategoryChanged.bind(this);
    this.onCategoryTitleChanged = this.onCategoryTitleChanged.bind(this);
    this.onCategoryDescriptionChanged = this.onCategoryDescriptionChanged.bind(
      this
    );
    this.createCategory = this.createCategory.bind(this);
    this.createTask = this.createTask.bind(this);
    this.clearModals = this.clearModals.bind(this);
    this.state = {
      taskModal: false,
      categoryModal: false,
      taskDescription: "",
      taskTitle: "",
      taskCategory: "",
      categoryTitle: "",
      categoryDescription: "",
    };
  }
  setTaskListView = () => {
    this.props.changeCurrentListView(TASK_VIEW);
  };
  setCategoryListView = () => {
    this.props.changeCurrentListView(CATEGORY_VIEW);
  };
  getCategoriesOptions() {
    let categories = this.props.category.categories.map((item) => {
      return (
        <option key={item.id} value={item.id}>
          {item.title}
        </option>
      );
    });
    categories.unshift(
      <option value="" selected>
        Выберите категорию
      </option>
    );
    return categories;
  }
  onTaskTitleChanged(title) {
    this.setState({ taskTitle: title });
  }
  onTaskDescriptionChanged(description) {
    this.setState({ taskDescription: description });
  }
  onTaskCategoryChanged(categoryId) {
    this.setState({ taskCategory: categoryId });
  }
  onCategoryTitleChanged(title) {
    this.setState({ categoryTitle: title });
  }
  onCategoryDescriptionChanged(description) {
    this.setState({ categoryDescription: description });
  }
  createTask() {
    this.props.addTask({
      title: this.state.taskTitle,
      description: this.state.taskDescription,
      category: this.state.taskCategory,
    });
  }
  createCategory() {
    this.props.addCategory({
      title: this.state.categoryTitle,
      description: this.state.categoryDescription,
    });
  }
  clearModals() {
    this.setState({
      taskModal: false,
      categoryModal: false,
      taskDescription: "",
      taskTitle: "",
      taskCategory: "",
      categoryTitle: "",
      categoryDescription: "",
    });
  }

  render() {
    return (
      <div>
        {this.state.taskModal ? (
          <CustomModal
            title="Создание задачи"
            onCancel={this.clearModals}
            confirmText="Создать"
            cancelText="Закрыть"
            onConfirm={() => {
              if (this.state.taskTitle.length > 0) {
                this.clearModals();
                this.createTask();
              } else {
                alert("Имя задачи является обязательным полем!");
              }
            }}
            onClose={this.clearModals}
          >
            <CategorySelector
              title="Категория"
              onChange={this.onTaskCategoryChanged}
            >
              {this.getCategoriesOptions()}
            </CategorySelector>
            <TextInput
              maxLength="255"
              placeholder="Введите имя задачи"
              title="Имя"
              isRequired={true}
              onChange={this.onTaskTitleChanged}
            ></TextInput>
            <TextInput
              placeholder="Введите описание задачи"
              title="Описание"
              maxLength="1536"
              onChange={this.onTaskDescriptionChanged}
            ></TextInput>
          </CustomModal>
        ) : null}
        {this.state.categoryModal ? (
          <CustomModal
            title="Создание категории"
            onCancel={this.clearModals}
            confirmText="Создать"
            cancelText="Закрыть"
            onClose={this.clearModals}
            onConfirm={() => {
              if (this.state.categoryTitle.length > 0) {
                this.clearModals();
                this.createCategory();
              } else alert("Имя категории является обязательным полем!");
            }}
          >
            <TextInput
              maxLength="255"
              placeholder="Введите имя категории"
              title="Имя"
              isRequired={true}
              onChange={this.onCategoryTitleChanged}
            ></TextInput>
            <TextInput
              maxLength="512"
              placeholder="Введите описание категории"
              title="Описание"
              onChange={this.onCategoryDescriptionChanged}
            ></TextInput>
          </CustomModal>
        ) : null}
        <div className="fixed-header">
          <a className="fixed-header-title">ToDo List</a>
          <div className="fixed-header-navigation">
            <a
              className="fixed-header-button-tasks"
              onClick={this.setTaskListView}
            >
              Задачи
            </a>
            |
            <a
              className="fixed-header-button-categories"
              onClick={this.setCategoryListView}
            >
              Категории
            </a>
          </div>
          {this.props.app.currentListView === TASK_VIEW ? (
            <a
              className="fixed-header-button-add-task"
              onClick={() => this.setState({ taskModal: true })}
            >
              Добавить задачу
            </a>
          ) : (
            <a
              className="fixed-header-button-add-category"
              onClick={() => this.setState({ categoryModal: true })}
            >
              Добавить категорию
            </a>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatch = { changeCurrentListView, addTask, addCategory };
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, mapDispatch)(FixedHeader);
