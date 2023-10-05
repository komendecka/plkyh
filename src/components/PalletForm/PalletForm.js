import styles from './PalletForm.module.scss';
import Button from "../Button/Button";
import {useState} from "react";

const PalletForm = props => {
    const [value, setValue] = useState('');
    const handleSubmit = e => {
        e.preventDefault();
        props.action({ title: value });
        setValue('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={value} onChange={e => setValue(e.target.value)} />
            <Button type='submit'>Add pallet</Button>
        </form>
    );
};

export default PalletForm;