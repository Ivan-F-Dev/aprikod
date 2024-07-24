import React from 'react';
import {ITodo} from "../../store/Todos";
import s from "./TodoInfo.module.scss"

type Props = {
    todo: ITodo | null
};
const TodoInfo = ({todo}: Props) => {
    return (
        <div className={s.TodoInfo}>
            <h2>{todo?.title}</h2>
            <p>{todo?.text}</p>
        </div>
    );
};

export default React.memo(TodoInfo)