import { get } from 'lodash';
import { TextField as MuiTextField, BaseTextFieldProps, OutlinedTextFieldProps } from "@mui/material";

export interface TextFieldProps extends OutlinedTextFieldProps {
    values?: object,
    errors?: object,
    touched?: object
}

function TextField({ name = '', values, errors, touched, ...others } : TextFieldProps) {
    return (
        <MuiTextField
            name={name}
            value={get(values, name)}
            error={Boolean(get(errors, name) && get(touched, name))}
            helperText={get(touched, name) ? get(errors, name) : ''}
            {...others}
        />
    )
}

export default TextField;