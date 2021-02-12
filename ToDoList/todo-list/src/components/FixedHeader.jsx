import React, { memo } from "react";
import { connect } from "react-redux";
import { changeCurrentListView } from "../app/appSlice";
import { TASK_VIEW, CATEGORY_VIEW } from "../app/appSlice";
class FixedHeader extends React.Component {
  constructor(props) {
    super(props);
    this.setTaskListView = this.setTaskListView.bind(this);
  }
  setTaskListView = () => {
    this.props.changeCurrentListView(TASK_VIEW);
  };
  setCategoryListView = () => {
    this.props.changeCurrentListView(CATEGORY_VIEW);
  };
  render() {
    return (
      <div className="fixed-header">
        <nav>
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
          {this.props.currentListView === TASK_VIEW ? (
            <a className="fixed-header-button-add-category">Добавить задачу</a>
          ) : (
            <a className="fixed-header-button-add-task">Добавить категорию</a>
          )}
        </nav>
      </div>
    );
  }
}

const mapDispatch = { changeCurrentListView };
const mapStateToProps = (state) => state.app;
export default connect(mapStateToProps, mapDispatch)(FixedHeader);
