import  {useState} from "react"

function useInput(validateField){
    const [enteredValue, setEnteredValue] = useState("")
    const [isTouched, setIsTouched] = useState(false)

    const valueIsValid = validateField(enteredValue)
    const fieldHasError = !valueIsValid && isTouched

    function handleEnteredValue(e){
        setEnteredValue(e.target.value)
    }

    function handleInputTouch(){
        setIsTouched(true)
    }

    function reset(){
        setEnteredValue("")
        setIsTouched(false)
    }

    return {
        enteredValue,
        valueIsValid,
        fieldHasError,
        handleEnteredValue,
        handleInputTouch,
        reset,
    }
}

export default useInput