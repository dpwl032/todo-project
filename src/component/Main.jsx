import "../App.css";
import Header from "../component/Header";
import { useState } from "react";
import TodoForm from "../component/TodoForm";
import DoLists from "../component/DoLists";
import DoneList from "../component/DoneList";
import styled from "styled-components";
import GlobalStyle from "../GlobalStyle";
import { Link } from "react-router-dom";
import TodoItem from "../pages/TodoItem";

const StContenWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StMenu = styled.h2`
  background-color: rgb(179, 226, 226);
`;

const InputWrap = styled.nav`
  max-width: 1200px;
  min-width: 800px;
  background-color: rgba(96, 91, 91, 0.074);
  border-radius: 10px;
  height: 70px;
  display: flex;
  align-items: center;
`;

const WrapWorking = styled.div`
  /* height: 1200px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 1 rem;
`;

function Main() {
  //todoList 배열선언 및 state
  const [toDoLists, setTodoLists] = useState([
    {
      id: 1,
      title: "리액트 입문",
      text: "입문 강의 복습하기",
      deadline: "2024-01-26",
      isDone: false,
    },
    {
      id: 2,
      title: "리액트 숙련",
      text: "숙련 강의 듣기",
      deadline: "2024-01-27",
      isDone: false,
    },
    {
      id: 3,
      title: "JS 복습",
      text: "JS 강의 복습하기",
      deadline: "2024-01-23",
      isDone: false,
    },
  ]);
  //input값 state화 ---> form으로 변경
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");

  const newTodoList = (newTodoList) => {
    setTodoLists((toDoLists) => [newTodoList, ...toDoLists]);
  };

  //삭제하기(working)
  const removeToDoList = (id) => {
    const newTodoList = toDoLists.filter((items) => items.id !== id);
    setTodoLists(newTodoList);
  };

  ////////////////////////////////////////////////////
  //doneList배열 및 state
  const [doneLists, setDoneLists] = useState([
    {
      id: 4,
      title: "JS 강의 듣기",
      text: "JS 강의 완강하기",
      deadline: "2024-01-18",
      isDone: true,
    },
    {
      id: 5,
      title: "개인 과제 제출",
      text: "리액트 개인과제",
      deadline: "2024-01-12",
      isDone: true,
    },
  ]);

  //삭제하기(done)
  const removeDoneList = (id) => {
    const newDoneList = doneLists.filter((items) => items.id !== id);
    setDoneLists(newDoneList);
  };

  //완료버튼시 working->Done
  const addDoneList = (id) => {
    const changeDone = toDoLists.filter((items) => items.id === id);
    const changeDoneList = { ...changeDone[0] };
    changeDoneList.isDone = true;
    setDoneLists([...doneLists, changeDoneList]);

    //원래 리스트에서 삭제
    const changeTodoList = toDoLists.filter((items) => items.id !== id);
    setTodoLists(changeTodoList);
  };

  //취소버튼시 Done-> working
  const addWorkingList = (id) => {
    // submit 이벤트가 일어나면 새로고침방지. submit 관련 태그 고유의 동작 금지
    const cancelDone = doneLists.filter((items) => items.id === id);
    const resultList = { ...cancelDone[0] };
    resultList.isDone = true;

    setTodoLists([...toDoLists, resultList]);

    const chandDoneList = doneLists.filter((items) => items.id !== id);
    setDoneLists(chandDoneList);
  };

  //todoList 정렬
  const [sortOrder, setSortOrder] = useState("asc");

  const doListSortHandler = (e) => {
    const newTodoList = [...toDoLists].sort((a, b) => {
      if (e === "asc") {
        return new Date(a.deadline) - new Date(b.deadline);
      }
      return new Date(b.deadline) - new Date(a.deadline);
    });
    setTodoLists(newTodoList);
  };

  //doneList 정렬
  const doneListSortHandler = (e) => {
    const newDoneList = [...doneLists].sort((a, b) => {
      if (e === "asc") {
        return new Date(a.deadline) - new Date(b.deadline);
      }
      return new Date(b.deadline) - new Date(a.deadline);
    });
    setDoneLists(newDoneList);
  };

  return (
    <>
      <GlobalStyle />
      <StContenWrap>
        <div className="contents">
          <Header />
          <InputWrap>
            <TodoForm newTodoList={newTodoList} />
          </InputWrap>

          <section>
            <StMenu>Working..🔥</StMenu>
            <select
              onChange={(e) => doListSortHandler(e.target.value)}
              DoLists={DoLists}
            >
              <option name="sortOrder" value="asc">
                오름차순{" "}
              </option>
              <option name="sortOrder" value="desc">
                {" "}
                내림차순{" "}
              </option>
            </select>
          </section>
          <WrapWorking>
            {toDoLists.map(function (items) {
              return (
                <DoLists
                  key={items.id}
                  toDoLists={toDoLists}
                  items={items}
                  addDoneList={addDoneList}
                  removeToDoList={removeToDoList}
                  doListSortHandler={doListSortHandler}
                />
              );
            })}
          </WrapWorking>
          <section>
            <StMenu>Done..🎉</StMenu>
            <select
              onChange={(e) => doneListSortHandler(e.target.value)}
              DoneList={DoneList}
            >
              <option name="sortOrder" value="asc" checked>
                오름차순{" "}
              </option>
              <option name="sortOrder" value="desc">
                {" "}
                내림차순{" "}
              </option>
            </select>
          </section>
          <WrapWorking>
            {doneLists.map(function (items) {
              {
                /* onSubmit은 form 안에 있을 때만 사용 가능, onClick은 상관없음 */
              }
              return (
                <DoneList
                  key={items.id}
                  doneLists={doneLists}
                  items={items}
                  addWorkingList={addWorkingList}
                  removeDoneList={removeDoneList}
                  doneListSortHandler={doneListSortHandler}
                />
              );
            })}
          </WrapWorking>
        </div>
      </StContenWrap>
    </>
  );
}

export default Main;
