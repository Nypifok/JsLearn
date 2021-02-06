import React from "react";
import FixedHeader from "./FixedHeader";
import TaskView from "./TaskView";

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <FixedHeader />
        <TaskView>
          <h1>
            ASDSвыффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффADs
          </h1>
        </TaskView>
      </div>
    );
  }
}
