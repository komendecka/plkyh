import styles from './WeightForm.module.scss';
import {useState} from 'react';
import Button from './../Button/Button';

const WeightForm = props => {
    const [weight, setWeight] = useState('');


    const handleSubmit = e => {
        e.preventDefault();
        props.addWeight(weight, props.palletId);
    };

    return (
        <form className={styles.weightForm} onSubmit={handleSubmit}>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} required/>
            <Button>Add Weight of Pallet </Button>
        </form>
    );
};



export default WeightForm;
