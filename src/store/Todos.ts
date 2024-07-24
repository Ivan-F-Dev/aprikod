import {makeAutoObservable} from 'mobx'
import {v4 as uuidv4} from 'uuid'
import {addTodoUtil, editTodoUtil, removeTodoUtil} from "../shared/utils/storeTodosUtils";

export interface ITodo {
    id: string
    title: string
    text: string
    childs: ITodo[]
}

class Todos {
    list: ITodo[] = [
        {
            id: '0',
            title: 'Задача 0',
            text: 'Выполнить тестовое задание 0.',
            childs: []
        },
        {
            id: '1',
            title: 'Задача 1',
            text: 'Выполнить тестовое задание.',
            childs: [
                {
                    id: '2',
                    title: 'Задача 1.1',
                    text: 'Выполнить тестовое задание 1.1.',
                    childs: []
                },
                {
                    id: '3',
                    title: 'Задача 1.2',
                    text: 'Выполнить тестовое задание 1.2.',
                    childs: [{
                        id: '4',
                        title: 'Задача 1.2.1',
                        text: 'Выполнить тестовое задание 1.2.1.',
                        childs: []
                    }]
                }
            ]
        },
        {
            id: '5',
            title: 'Задача 5',
            text: 'Выполнить тестовое задание 5.',
            childs: []
        },
        {
            id: '6',
            title: 'Задача 6',
            text: 'Выполнить тестовое задание 6.',
            childs: []
        },
    ]
    selectedList: string[] = []

    constructor() {
        makeAutoObservable(this)
    }

    addTodo = (id: string | undefined) => {
        this.list = addTodoUtil(this.list, id)
    }
    editTodo = (id: string, todo: ITodo) => {
        this.list = editTodoUtil(id, todo, this.list)
    }
    removeTodo = () => {
        this.list = removeTodoUtil(this.selectedList, this.list)
    }

    setSelected = (id:string) => {
        let isExist = this.selectedList.indexOf(id) > -1
        if (isExist) {
            this.selectedList = this.selectedList.filter(el => el !== id)
        } else {
            this.selectedList = [id, ...this.selectedList]
        }
    }
}

export default new Todos()