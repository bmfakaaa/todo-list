import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ]
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            };
        });
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        // this.state;  this.state.todoList

        // this.setState({
        //     todoList: [newItem, newItem, newItem],
        // })

        /*
        * Обновить стейт
        * 1. Собрать новый стейт
        * 2. Добавить элемент
        * 3. update state
        * */

        // this.state  <-  current state {}
        // this.state.todoDate - old friends
        // newIten - new Friend
        /*

       this.state = { todoData: [] }
        * */

        // const arr = [1,2];
        //
        // const arr2 = [arr, [3]]  // [1,2,3]  [[1,2], 3]  [[1,2],[3]]
        //
        // const arr2 = [ arr ,3]; // [[1,2], 3]
        // const arr2 = [ ...arr ,3]; //[1,2,3]

        // this.state.todoDate


        //
        // const newState = {
        //     todoData: [...this.state.todoData, newItem]
        // }
        // this.setState(newState)



        // this.setState(this.state:)



        // this.setState((prevState) => {
        //     return {
        //         todoData: [...prevState.todoData, newItem]
        //     }
        // })


        // this.setState(({ todoData }) => {
        //     return { todoData: [...todoData, newItem] };
        // })


        this.setState(({ todoData }) => ({ todoData: [...todoData, newItem] }))





        // this.setState(({ todoData }) => {
        //
        //     const newArr = [
        //         ...todoData,
        //         newItem
        //     ];
        //
        //     return {
        //         todoData: newArr
        //     };
        // });
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        };

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };

    render() {

        const { todoData } = this.state;
        const doneCount = todoData
                          .filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>

                <TodoList
                    todos={todoData}
                    onDeleted={ this.deleteItem }
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />

                <ItemAddForm onItemAdded={ this.addItem }/>
            </div>
        );
    }
};