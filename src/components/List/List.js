import styles from './List.module.scss';
import Pallet from "../Pallet/Pallet";
import shortid from 'shortid';
import PalletForm from "../PalletForm/PalletForm";
import {useState} from "react";


const List = () => {

    const [pallets, setPallets] = useState([
        {
            id: 1,
            title: 1,
            items: [
                { id: 1, title: '80.60.250', weight: '10.77'},
                { id: 2, title: '15.62.1000', weight: '19.75'}
            ]
        },
        {
            id: 2,
            title: 2,
            items: [
                { id: 1, title: '80.60.250', weight: '10.77'},
                { id: 2, title: '15.62.1000', weight: '19.75'}
            ]
        },
        {
            id: 3,
            title: 3,
            items: [
                { id: 1, title: '80.60.250', weight: '10.77'},
                { id: 2, title: '15.62.1000', weight: '19.75'}
            ]
        }
    ]);

    const addPallet = newPallet => {
        setPallets([...pallets, { id: shortid(), title: newPallet.title, items: [] }]);
    };

    const addCard = (newCard, palletId) => {
        const palletsUpdated = pallets.map(pallet => {
            if(pallet.id === palletId)
                return { ...pallet, items: [...pallet.items, { id: shortid(), title: newCard.title }]}
            else
                return pallet
        })

        setPallets(palletsUpdated);

    };


    return (
        <div className={styles.list}>
            <header className={styles.header}>
                <h2 className={styles.title}>Pallets to add<span>soon!</span></h2>
            </header>
            <p className={styles.description}>Please add first pallet plus products on it.</p>
            <section className={styles.columns}>
                {pallets.map(pallet => <Pallet addCard={addCard} key={pallet.id} id={pallet.id} title={pallet.title} items={pallet.items} />)}
            </section>
            <PalletForm action={addPallet} />
        </div>
    );
};

export default List;