import React from "react";
import { connect } from "react-redux";
import { addTask, removeTask } from "../task/taskSlice";
import CustomModal from "./CustomModal";
import TaskListItem from "./TaskListItem";
export class TaskView extends React.Component {
  constructor(props) {
    super(props);
    this.deleteTask = this.deleteTask.bind(this);
    this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
    this.state = { deleteModal: false, itemToDelete: 1 };
  }
  deleteTask(id) {
    this.state.itemToDelete = id;
    this.setState({ deleteModal: true });
  }
  onDeleteConfirm(id) {
    this.setState({ deleteModal: false });
    this.props.removeTask(id);
  }
  render() {
    return (
      <div className="task-view">
        {this.state.deleteModal ? (
          <CustomModal
            title="Удаление задачи"
            confirmMessage={
              "Вы уверены, что хотите удалить задачу" +
              this.props.tasks
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
        <ul className="task-list">
          {this.props.tasks.map((item) => {
            return (
              <TaskListItem
                title={item.title}
                description={item.description}
                key={item.id}
                id={item.id}
                showDeleteModal={this.deleteTask}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
const mapDispatch = { addTask, removeTask };
const mapStateToProps = (state) => state.task;
export default connect(mapStateToProps, mapDispatch)(TaskView);
