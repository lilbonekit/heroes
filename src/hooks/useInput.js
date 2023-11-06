import { useState } from "react";

const useInput = (initialValue) => {
    const [inputValue, setInputValue] = useState(initialValue)

    const onValueChange = (e) => {
        setInputValue(e.target.value)
    }

    const clear = () => {
        setInputValue(initialValue)
    }

    return {inputValue, onValueChange, clear}
}

export default useInput