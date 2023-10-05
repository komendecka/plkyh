import styles from './Pallet.module.scss'
import Card from '../Card/Card.js'

const Pallet = props => {
    return (
        <article className={styles.column}>
            <h2 className={styles.title}>
                {props.title}
            </h2>
            <ul className={styles.pallets}>
                {props.items.map(item => <Card key={item.id} title={item.title} />)}
            </ul>
        </article>


    );
};

export default Pallet;

