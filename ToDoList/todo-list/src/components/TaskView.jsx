import React from "react";
import { connect } from "react-redux";
import { addTask, removeTask, fetchTasks, updateTask } from "../task/taskSlice";
import CategorySelector from "./CategorySelector";
import CustomModal from "./CustomModal";
import TaskListItem from "./TaskListItem";
import { TextInput } from "./TextInput";
export class TaskView extends React.Component {
  constructor(props) {
    super(props);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
    this.onEditConfirm = this.onEditConfirm.bind(this);
    this.onTaskTitleChanged = this.onTaskTitleChanged.bind(this);
    this.onTaskDescriptionChanged = this.onTaskDescriptionChanged.bind(this);
    this.onTaskCategoryChanged = this.onTaskCategoryChanged.bind(this);
    this.getTask = this.getTask.bind(this);
    this.getCategoriesOptionsWithDefault = this.getCategoriesOptionsWithDefault.bind(
      this
    );
    this.state = { deleteModal: false, editModal: false, currentItem: 1 };
  }
  componentDidMount() {
    this.taskUpdate = setInterval(() => this.props.fetchTasks(), 500);
  }
  componentWillUnmount() {
    clearInterval(this.taskUpdate);
  }

  editTask(id) {
    this.state.currentItem = id;
    let task = this.getTask(id);
    this.setState({
      editModal: true,
      taskTitle: task.title,
      taskDescription: task.description,
      taskCategory: task.category,
    });
  }
  deleteTask(id) {
    this.state.currentItem = id;
    this.setState({ deleteModal: true });
  }
  onDeleteConfirm(id) {
    this.setState({ deleteModal: false });
    this.props.removeTask(id);
  }
  onEditConfirm() {
    if (this.state.taskTitle.length > 0) {
      this.props.updateTask({
        id: this.state.currentItem,
        title: this.state.taskTitle,
        description: this.state.taskDescription,
        category: this.state.taskCategory,
      });
      this.setState({
        editModal: false,
        taskTitle: "",
        taskDescription: "",
        taskCategory: "",
      });
    } else alert("Имя задачи является обязательным полем!");
  }
  getTask(id) {
    return this.props.task.tasks.filter((item) => item.id === id).shift();
  }
  getCategoriesOptionsWithDefault() {
    let taskCategory = this.getTask(this.state.currentItem).category;

    let containCategory = false;
    let categories = this.props.category.categories.map((item) => {
      if (item.id == taskCategory) {
        containCategory = true;
        return (
          <option value={item.id} key={item.id} selected>
            {item.title}
          </option>
        );
      }
      return (
        <option key={item.id} value={item.id}>
          {item.title}
        </option>
      );
    });
    categories.unshift(
      <option value="" selected={containCategory ? null : true}>
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
  render() {
    return (
      <div className="task-view">
        {this.state.deleteModal ? (
          <CustomModal
            title="Удаление задачи"
            confirmMessage={
              "Вы уверены, что хотите удалить задачу" +
              this.props.task.tasks
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
            title="Редактирование задачи"
            itemId={this.state.currentItem}
            onConfirm={this.onEditConfirm}
            onCancel={() =>
              this.setState({
                editModal: false,
                taskTitle: "",
                taskDescription: "",
                taskCategory: "",
              })
            }
            confirmText="Сохранить"
            cancelText="Закрыть"
            onClose={() =>
              this.setState({
                editModal: false,
                taskTitle: "",
                taskDescription: "",
                taskCategory: "",
              })
            }
          >
            <CategorySelector
              title="Категория"
              onChange={this.onTaskCategoryChanged}
            >
              {this.getCategoriesOptionsWithDefault()}
            </CategorySelector>
            <TextInput
              placeholder="Введите имя задачи"
              title="Имя"
              maxLength="255"
              isRequired={true}
              defaultValue={this.getTask(this.state.currentItem).title}
              onChange={this.onTaskTitleChanged}
            ></TextInput>
            <TextInput
              maxLength="1536"
              placeholder="Введите описание задачи"
              title="Описание"
              defaultValue={this.getTask(this.state.currentItem).description}
              onChange={this.onTaskDescriptionChanged}
            ></TextInput>
          </CustomModal>
        ) : null}
        <ul className="task-list">
          {this.props.task.tasks.map((item) => {
            return (
              <TaskListItem
                title={item.title}
                description={item.description}
                category={item.category}
                key={item.id}
                id={item.id}
                showDeleteModal={this.deleteTask}
                showEditModal={this.editTask}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
const mapDispatch = { addTask, removeTask, fetchTasks, updateTask };
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, mapDispatch)(TaskView);
