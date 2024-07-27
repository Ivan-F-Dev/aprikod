import {makeAutoObservable} from 'mobx'
import {addTodoUtil, editTodoUtil, removeTodoUtil, searchTodos} from "../shared/utils/storeTodosUtils";

export interface ITodo {
    id: string
    title: string
    text: string
    childs: ITodo[]
}

class Todos {
    searchList: ITodo[] = []
    list: ITodo[] = [
        {
            id: '1',
            title: 'Задача 1 (1)',
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
            title: 'Задача 2 (5)',
            text: 'Выполнить тестовое задание 5.',
            childs: []
        },
        {
            id: '6',
            title: 'Задача 3 (6)',
            text: 'Выполнить тестовое задание 6.',
            childs: []
        },
    ]
    selectedList: string[] = []
    chosenTodo: ITodo | null = null

    constructor() {
        makeAutoObservable(this)
        let local = JSON.parse(localStorage.aprikodTodos || null)
        if (local) this.list = local
    }

    addTodo = (id: string | undefined) => {
        console.log('addTodo')
        this.list = addTodoUtil(this.list, id)
        localStorage.aprikodTodos = JSON.stringify(this.list)
    }
    editTodo = (id: string, todo: ITodo) => {
        this.list = editTodoUtil(id, todo, this.list)
        localStorage.aprikodTodos = JSON.stringify(this.list)
    }
    removeTodo = () => {
        console.log('removeTodo')
        this.list = removeTodoUtil(this.selectedList, this.list)
        localStorage.aprikodTodos = JSON.stringify(this.list)
    }
    setSelected = (id:string) => {
        let isExist = this.selectedList.indexOf(id) > -1
        if (isExist) {
            this.selectedList = this.selectedList.filter(el => el !== id)
        } else {
            this.selectedList = [id, ...this.selectedList]
        }
    }
    chooseTodo = (todo: ITodo) => {
        this.chosenTodo = todo
    }
    search = (text: string, field: 'title' | 'text' = 'title', includeNeighbours: boolean = false) => {
        this.searchList = searchTodos(text, this.list, field, includeNeighbours)
        console.log({slist: this.searchList,text,field})
    }
}

export default new Todos()