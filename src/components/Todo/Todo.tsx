import React, {useEffect, useState} from 'react';
import {ITodo} from "../../store/Todos";
import s from "./Todo.module.scss"
import {Icon} from "../Icon/Icon";

type Props = {
    todo: ITodo
    parentChecked?: boolean
    selected: string[]
    setSelected: (id: string) => void
};

const Todo = ({todo, parentChecked = false, selected, setSelected}: Props) => {
    const [open, setOpen] = useState(true)
    const checked = selected.indexOf(todo.id) > -1

    const setOpenHandler = () => {
        setOpen(!open)
    }
    const setCheckedHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        setSelected(todo.id)
    }
    const selectHandler = () => {

    }

    return (
        <div className={s.Todo}>
            <div className={s.Todo__main + ` ${checked && s.Todo__main__checked}`}>
                <div onClick={selectHandler}>
                    <span>{todo.title}</span>
                    <div className={s.Todo__check} onClick={setCheckedHandler}>
                        {checked && <Icon icon={"check"}/>}
                    </div>
                </div>
                <Icon icon={todo.childs.length ? "chevron" : "circle"} left={-25} rotate={open ? 90 : 0} cb={setOpenHandler}/>
            </div>
            {(!!todo.childs.length && open) && <div className={s.Todo__childs}>
                {todo.childs.map(el => <Todo key={el.id} todo={el} parentChecked={checked} setSelected={setSelected} selected={selected}/>)}
            </div>}
        </div>
    );
};

export default React.memo(Todo)