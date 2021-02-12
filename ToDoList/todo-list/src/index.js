import ReactDOM from "react-dom";
import App from "./components/App";
import "../src/App.css";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import taskReducer from "./task/taskSlice";
import categoryReducer from "./category/categorySlice";
import appReducer from "./app/appSlice";

const rootreducer = combineReducers({
  app: appReducer,
  task: taskReducer,
  category: categoryReducer,
});
export const store = configureStore({
  reducer: rootreducer,
});
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
