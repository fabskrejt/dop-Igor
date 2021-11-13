import React, {ChangeEvent, KeyboardEvent} from "react";

type InputPropsType = {
    title: string
    onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyPressHandler: (e: KeyboardEvent<HTMLInputElement>) => void
    className?: string
}

export const Input = (props: InputPropsType) => {

    return (
        <input value={props.title}
               onChange={props.onChangeHandler}
               onKeyPress={props.onKeyPressHandler}
               className={props.className}
        />
    )
}