import React from 'react';
import {ITodo} from "../../store/Todos";
import {Todo} from "../Todo/Todo";

type Props = {
    list: ITodo[]
};
export const TodoList = ({list}: Props) => {
    return (
        <div>
            {list.map(el => <Todo todo={el}/>)}
        </div>
    );
};