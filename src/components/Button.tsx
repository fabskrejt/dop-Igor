import React from "react";
import {FilterValuesType} from "../App";

type ButtonPropsType = {
    name: string
    className: string
    callback: () => void
    filter: FilterValuesType
}

export const Button = (props: ButtonPropsType) => {
    const onClickHandler = () => {
        props.callback()
    }
    return (
        <button className={props.className} onClick={() => onClickHandler()}>{props.name}</button>
    )
}