import styles from './CardForm.module.scss';
import {useState} from 'react';
import Button from './../Button/Button';

const CardForm = props => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');


    const handleSubmit = e => {
        e.preventDefault();
        props.addCard({ title: title, amount: amount}, props.palletId);
    };

    return (
        <form className={styles.cardForm} onSubmit={handleSubmit}>
            <select value={title} onChange={(e) => setTitle(e.target.value)}>
                <option value="" disabled selected>Select product</option>
            {props.pw.map((key) => (<option value={key} key={key}>{key}</option>))}
            </select>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required/>
            <Button>Add Product </Button>
        </form>
    );
};



export default CardForm;
