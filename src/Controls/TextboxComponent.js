import { TextField } from "@material-ui/core";

function TextboxComponent(props) {
    return (
        <>
            <TextField id={props.name} fullWidth variant="outlined" name={props.name} label={props.label} value={props.value}
                onChange={props.formik.handleChange}
                error={props.formik.touched[props.name] && Boolean(props.formik.errors[props.name])}
                helperText={props.formik.touched[props.name] && Boolean(props.formik.errors[props.name]) ? props.formik.errors[props.name] : ""}
            ></TextField>
        </>
    )
}
export default TextboxComponent;