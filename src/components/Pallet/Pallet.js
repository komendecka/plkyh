import styles from './Pallet.module.scss'
import Card from '../Card/Card.js'
import CardForm from "../CardForm/CardForm";
import Button from "../Button/Button";



const Pallet = props => {

    const removedPallet = () => {
        console.log(props.onDeletePallet);
        if (props.onDeletePallet) {
            props.onDeletePallet(props.pid);
        }
    };


    return (
        <article className={styles.column}>
            <h2 className={styles.title}>
                {props.pid}
            </h2>
            <button type="button" onClick={removedPallet} className={styles.bin_btn}><span className='fa fa-trash'></span> </button>
            {/*<Button type="button" onClick={removedPallet} className={styles.bin_btn}> <span className='fa fa-trash'></span> </Button>*/}
            <ul className={styles.pallets}>
                {props.items.map(item => (
                    <Card
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        amount={item.amount}
                        onDelete={() => props.onDeleteCard(props.pid, item.id)}  // Pass the function here
                    />
                ))}
            </ul>

            <CardForm palletId={props.pid} action={props.palletId} addCard={props.addCard} pw={props.pw} />
        </article>
    );
};

export default Pallet;

