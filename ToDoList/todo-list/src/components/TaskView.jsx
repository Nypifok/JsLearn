import React from "react";
import CustomModal from "./CustomModal";

export default class TaskView extends React.Component {
  render() {
    return (
      <div className="task-view">
        <ul className="task-list"></ul>
        <CustomModal title="Создание задачи"></CustomModal>
      </div>
    );
  }
}
