import Button from "@material-ui/core/Button";
import { CheckCircle } from '@material-ui/icons';

function ConfirmComponent(props) {

    // const { message } = useState(props);

    // const handleOk = () => {
    //     props.confirmDailogClose(props.data, true);
    // }

    return (
        <div>
            <div className='full-width text-center pb-16'>
                <span>{props.message}</span>
            </div>

            <div className='full-width text-center'>
                <Button variant="contained" onClick={() => props.confirmDailogClose(props.id, true)}>
                    <CheckCircle className='pr-8'></CheckCircle> Yes
                </Button>
            </div>

        </div >


    )
}
export default ConfirmComponent;