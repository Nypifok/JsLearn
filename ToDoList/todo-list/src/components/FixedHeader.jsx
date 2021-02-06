import React from "react";

export default class FixedHeader extends React.Component {
  render() {
    return (
      <div className="fixed-header">
        <nav>
          <a className="fixed-header-title">ToDo List</a>
          <div className="fixed-header-navigation">
            <a className="fixed-header-button-tasks">Задачи</a>|
            <a className="fixed-header-button-categories">Категории</a>
          </div>
          <a className="fixed-header-button-add-category">Добавить задачу</a>
          <a className="fixed-header-button-add-task">Добавить категорию</a>
        </nav>
      </div>
    );
  }
}
