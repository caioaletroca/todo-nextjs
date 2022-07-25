import { IconButton, InputAdornment } from "@mui/material";
import React from "react";
import TextField, { TextFieldProps } from "./TextField";

export interface PasswordFieldProps extends TextFieldProps {}

function PasswordField (props: PasswordFieldProps) {
    const [visibility, useVisibility] = React.useState(false);

    return (
        <TextField
            type={visibility ? 'text' : 'password'}
            InputProps={{
                endAdornment:
                    <InputAdornment position='end'>
                        <IconButton onClick={() => useVisibility(!visibility)}>
                            <span className="material-icons">{visibility ? "visibility_off" : "visibility"}</span>
                        </IconButton>
                    </InputAdornment>
            }}
            {...props}
        />
    )
}

export default PasswordField;