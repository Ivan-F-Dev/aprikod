import React from 'react';
import {ITodo} from "../../store/Todos";

type Props = {
    todo: ITodo
};

export const Todo = ({todo}: Props) => {
    return (
        <div>
            Task {todo.id}
            {!!todo.childs.length && <div style={{marginLeft: '20px'}}>
                {todo.childs.map(el => <Todo todo={el}/>)}
            </div>}
        </div>
    );
};