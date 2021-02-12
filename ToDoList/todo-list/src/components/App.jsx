import React from "react";
import FixedHeader from "./FixedHeader";
import TaskView from "./TaskView";
import { connect } from "react-redux";
import { TASK_VIEW } from "../app/appSlice";
import CategoryView from "./CategoryView";

export class App extends React.Component {
  render() {
    return (
      <div className="app">
        <FixedHeader />
        {this.props.currentListView === TASK_VIEW ? (
          <TaskView></TaskView>
        ) : (
          <CategoryView></CategoryView>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => state.app;
export default connect(mapStateToProps, null)(App);
