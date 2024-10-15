import { useState } from "react";

export function useForm(initialState, onSubmit) {
    const [values, setValues] = useState(initialState);
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(values);
        setValues(initialState);
    }

    return  { values, handleChange, handleSubmit };
}
