import styles from './Pallet.module.scss'
import Card from '../Card/Card.js'
import CardForm from "../CardForm/CardForm";
import WeightForm from "../WeightForm/WeightForm";



const Pallet = props => {

    const removedPallet = () => {
        if (props.onDeletePallet) {
            props.onDeletePallet(props.pid);
        }
    };



    return (
        <article className={styles.column}>
            <h2 className={styles.title}>
                {props.title}
            </h2>
            <p>Pallet weight: {props.weight}</p>
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
            <WeightForm palletId={props.pid} action={props.palletId} addWeight={props.addWeight}/>
        </article>
    );
};

export default Pallet;

