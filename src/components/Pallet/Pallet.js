import styles from './Pallet.module.scss'
import Card from '../Card/Card.js'
import CardForm from "../CardForm/CardForm";


const Pallet = props => {
    return (
        <article className={styles.column}>
            <h2 className={styles.title}>
                {props.id}
            </h2>
            <ul className={styles.pallets}>
                {props.items.map(item => <Card key={item.id} title={item.title} />)}
            </ul>
            <CardForm columnId={props.id} action={props.columnId} addCard={props.addCard} />
        </article>


    );
};

export default Pallet;

