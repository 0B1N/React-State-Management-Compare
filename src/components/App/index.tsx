import * as React from "react";

import MobxTodoList from "../MobxTodoList";

import "./index.scss";

interface IApp {}

const App: React.FunctionComponent<IApp> = (props) => {
  return (
    <div>
      <MobxTodoList />
    </div>
  );
};

export default App;
