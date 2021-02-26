import React from "react";
import FixedHeader from "./FixedHeader";
import TaskView from "./TaskView";
import { connect } from "react-redux";
import { TASK_VIEW } from "../app/appSlice";
import { addTask, fetchTasks } from "../task/taskSlice";
import { addCategory, fetchCategories } from "../category/categorySlice";
import CategoryView from "./CategoryView";

export class App extends React.Component {
  componentDidMount() {
    this.props.fetchTasks();
    this.props.fetchCategories();
  }
  render() {
    return (
      <div className="app">
        <FixedHeader />
        {this.props.app.currentListView === TASK_VIEW ? (
          <TaskView></TaskView>
        ) : (
          <CategoryView></CategoryView>
        )}
      </div>
    );
  }
}
const mapDispatch = { addTask, fetchTasks, addCategory, fetchCategories };
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, mapDispatch)(App);
