import React, {useEffect, useState} from 'react';
import {ITodo} from "../../store/Todos";
import s from "./TodoInfo.module.scss"
import {Icon} from "../Icon/Icon";

type Props = {
    chosenTodo: ITodo | null
    addTodo: (id: string | undefined) => void
    editTodo: (id: string, todo: ITodo) => void
};
const TodoInfo = ({chosenTodo, addTodo, editTodo}: Props) => {

    const [todo, setTodo] = useState(chosenTodo)
    const [fields, setFields] = useState([false, false])
    console.log('TodoInfo: ', {todo, fields})
    useEffect(() => {
        setTodo(chosenTodo)
        setFields([false,false])
    }, [chosenTodo])

    const setFieldsHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.FocusEvent<HTMLInputElement, Element>, blur?: boolean) => {
        let id = e.currentTarget.id

        setFields(prev => {
            // console.log('prev: ', prev)
            prev[id === 'title' ? 0 : 1] = !prev[id === 'title' ? 0 : 1]
            // console.log('prev: ', prev)
            return [...prev]
        })
        if (todo) editTodo(todo.id,todo)
    }

    const setTodoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let name = e.target.id
        setTodo(prev => {
            if (prev === null) return null
            prev[name === 'title' ? 'title' : 'text'] = e.target.value
            return {...prev}
        })
    }

    const addTodoHandler = () => {
        if (todo) addTodo(todo.id)
    }

    return (
        <div className={s.TodoInfo}>
            {!!todo
                ? <>
                    <div className={s.TodoInfo__controls}>
                        <button onClick={addTodoHandler}>Добавить подзадачу</button>
                        {/*<button onClick={removeTodos}>Удалить выделенные</button>*/}
                    </div>
                    <div className={s.TodoInfo__item}>
                        {fields[0]
                            ? <input id="title" type="text" value={todo.title} onChange={setTodoHandler}
                                     onBlur={setFieldsHandler}/>
                            : <h2>{todo?.title}</h2>
                        }
                        <Icon icon={"edit"} right={0} id={'title'} cb={setFieldsHandler}/>
                    </div>
                    <div className={s.TodoInfo__item}>
                        {fields[1]
                            ? <input id="text" type="text" value={todo.text} onChange={setTodoHandler}
                                     onBlur={setFieldsHandler}/>
                            : <p>{todo?.text}</p>
                        }
                        <Icon icon={"edit"} right={0} id={'text'} cb={setFieldsHandler}/>
                    </div>
                </>
                : <span>Задача не выбрана</span>
            }
        </div>
    );
};

export default React.memo(TodoInfo)