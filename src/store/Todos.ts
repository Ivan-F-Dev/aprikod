import {makeAutoObservable} from 'mobx'

export interface ITodo {
    id: string
    title: string
    text: string
    childs: ITodo[]
}

class Todos {
    list: ITodo[] = [
        {
            id: '1',
            title: 'Задача 1',
            text: 'Выполнить тестовое задание.',
            childs: [
                {
                id: '2',
                title: 'Задача 2',
                text: 'Выполнить тестовое задание 2.',
                childs: []
            }
            ]
        }
    ]

    constructor() {
        makeAutoObservable(this)
    }
}

export default new Todos()