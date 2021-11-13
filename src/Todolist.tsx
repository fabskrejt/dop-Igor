import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Tasks} from "./Tasks";
import {Button} from "./components/Button";
import {Input} from "./components/Input";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void
    filter: FilterValuesType
    todolistID: string

}

export function Todolist({tasks, ...props}: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim(), props.todolistID);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }
    const changeFilterOnClickHandler = (value: FilterValuesType) => props.changeFilter(value, props.todolistID);

    let tasksForTodolist = tasks

    if (props.filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <Input
                title={title}
                onChangeHandler={onChangeHandler}
                onKeyPressHandler={onKeyPressHandler}
                className={error ? "error" : ""}
            />

            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                tasksForTodolist.map(t => {
                    return (
                        <Tasks t={t} todolistID={props.todolistID} removeTask={props.removeTask}
                               changeTaskStatus={props.changeTaskStatus}/>
                    )
                })
            }
        </ul>
        <div>
            <Button name={'all'}
                    className={props.filter === 'all' ? "active-filter" : ""}
                    callback={() => changeFilterOnClickHandler('all')}
                    filter={props.filter}
            />
            <Button name={'active'}
                    className={props.filter === 'active' ? "active-filter" : ""}
                    callback={() => changeFilterOnClickHandler('active')}
                    filter={props.filter}
            />
            <Button name={'completed'}
                    className={props.filter === 'completed' ? "active-filter" : ""}
                    callback={() => changeFilterOnClickHandler('completed')}
                    filter={props.filter}
            />

        </div>
    </div>
}
