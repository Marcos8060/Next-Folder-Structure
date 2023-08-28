import {Autocomplete} from "@mui/material";
import DMTTextInput from "./text-input";
import {getAutoCompleteValue} from "../../../utils/helper-functions";



const DMTDropdown = props => {
    const {  onChange, label, options, value, required, error, onBlur, helperText, isArrayObject= false, valueField, ...other} = props;

    const handleOnChange = (e, value) => {
       onChange(value);
    }

    if (isArrayObject === true){
        return (
            <>
                <Autocomplete
                    options={options}
                    autoHighlight
                    onChange={handleOnChange}
                    value={getAutoCompleteValue(options,value)}
                    getOptionLabel={(option) => option[valueField]}
                    renderInput={(params) => (
                        <DMTTextInput
                            {...params}
                            label={label}
                            required={required}
                            error={error}
                            onBlur={onBlur}
                            helperText={helperText}
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                    {...other}
                />
            </>
        )
    }

    return (
        <>
            <Autocomplete
                options={options}
                autoHighlight
                onChange={handleOnChange}
                value={value}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                    <DMTTextInput
                        {...params}
                        label={label}
                        required={required}
                        error={error}
                        onBlur={onBlur}
                        helperText={helperText}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                    />
                )}
                {...other}
            />
        </>
    )
}

export default DMTDropdown;