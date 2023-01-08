import { TextField } from "@material-ui/core";

function NumberComponent(props) {
    return (
        <>
            <TextField id={props.name} type="number" fullWidth variant="outlined" name={props.name} label={props.label} value={props.value}
                onChange={props.formik.handleChange}
                error={props.formik.touched[props.name] && Boolean(props.formik.errors[props.name])}
                helperText={props.formik.touched[props.name] && Boolean(props.formik.errors[props.name]) ? props.formik.errors[props.name] : ""}
            ></TextField>
        </>
    )
}
export default NumberComponent;