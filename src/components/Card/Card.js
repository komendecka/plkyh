import styles from './Card.module.scss';

const Card = props => {

    const removedCard = () => {
        if (props.onDelete) {
            console.log(props.id);
            props.onDelete(props.id);
        }
    };

    return (
        <li className={styles.card}> <div>
            <span><p>{props.title}</p><p>{props.amount}</p></span>
            <button type="button" onClick={removedCard} className={styles.bin_btn}>
                <span className='fa fa-trash'></span>
            </button>
        </div>

            </li>
    );
};

export default Card;