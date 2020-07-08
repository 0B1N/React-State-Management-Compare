import * as React from "react";

import { useObserver, useLocalStore } from "mobx-react-lite";

import { Input, Button, Checkbox } from "antd";

import "./index.scss";

interface IMobxTodoListProps {}

interface IMobxTodoListState {
  title?: string;
  status?: boolean;
}

const MobxTodoList: React.FunctionComponent<IMobxTodoListProps> = (props) => {
  return useObserver(() => {
    const list = useLocalStore(() => [] as IMobxTodoListState[]);

    const listRef = React.useRef() as React.RefObject<HTMLUListElement>;

    const state = useLocalStore(() => {
      return {
        added: false,
        title: "",
      };
    });

    return (
      <section>
        <h1>Mobx Todo List</h1>

        {list.length === 0 && <span>오늘 할일을 추가해주세요.</span>}

        <ul className="list" ref={listRef}>
          {state.added ? (
            <li className="list-item">
              <article className="list-wrapper">
                <Input
                  value={state.title}
                  onChange={(e) => (state.title = e.target.value)}
                  className="list-input"
                  type="text"
                />
                <Button
                  onClick={() => {
                    list.push({ title: state.title, status: false });
                    state.title = "";
                    state.added = false;
                  }}
                  className="list-submit"
                  type="primary"
                >
                  전송
                </Button>
              </article>
            </li>
          ) : null}
          {list.map((item, index) => (
            <Checkbox
              className="list-item"
              value={list[index].status}
              onChange={() => false}
            >
              <span className={`title ${list[index].status}`}>
                {item.title}
              </span>
            </Checkbox>
          ))}
        </ul>

        <button
          className="add-button"
          onClick={() => {
            if (!state.added) {
              state.added = true;
              listRef.current?.scrollTo({ top: 0 });
            }
          }}
        ></button>
      </section>
    );
  });
};

export default MobxTodoList;
