import styles from './CardForm.module.scss';
import {useState} from 'react';
import Button from './../Button/Button';

const CardForm = props => {
    const [title, setTitle] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        props.addCard({ title: title }, props.columnId);
        setTitle('');
    };

    return (
        <form className={styles.cardForm} onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            <Button>Add Product </Button>
        </form>
    );
};



export default CardForm;
