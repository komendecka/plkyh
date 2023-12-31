import styles from './List.module.scss';
import Pallet from "../Pallet/Pallet";
import shortid from 'shortid';
import PalletForm from "../PalletForm/PalletForm";
import {useState} from "react";
import Button from "../Button/Button";
import { useEffect } from "react";
import PackingList from "../PackingList/PackingList";


const List = () => {

   // const [pallets, setPallets] = useState([]);
    const [pallets, setPallets] = useState([
        {
            pid: 1,
            title: 8,
            items: [
                { id: 1, title: '80.62.250', amount: '80'},
            ],
            weight: 874,
        },
        {
            pid: 2,
            title: 1,
            items: [
                { id: 1, title: '15.62.1000', amount: '20'},
                { id: 2, title: '30.06.100', amount: '300'}
            ],
            weight: 654,

        },
        {
            pid: 3,
            title: 2,
            items: [
                { id: 1, title: '28.08.500', amount: '200'},
                { id: 1, title: '28.06.500', amount: '300'},
                { id: 1, title: '10.09.04.100', amount: '20'},
                { id: 1, title: '10.19.03.100', amount: '20'},
            ],
            weight: 726,
        },
        {
            pid: 4,
            title: 3,
            items: [
                { id: 1, title: '01.30.500', amount: '100'},
                { id: 1, title: '14.16.500', amount: '100'},
                { id: 1, title: '86.91.100', amount: '30'},
                { id: 1, title: '15.30.1000', amount: '30'},
            ],
            weight: 872,
        },

    ]);

    // const [productsWeights, setProductWeights] = useState('');
    const [productsWeights, setProductWeights] = useState({
        "001.15.20": 0.4,
        "001.21.17.10": 1.1,
        "001.21.42.20": 2.3,
        "002.15.20": 0.14,
        "002.15.44": 0.46,
        "002.21.42.20": 0.7,
        "003.15.30": 0.7,
        "003.21.42": 2.3,
        "007.20.4": 0.47,
        "007.25.5": 0.48,
        "10.19.03.100": 1.7,
        "10.19.04.100": 1.7,
        "15.62.1000": 19.75,
        "19.27.01.1000": 5.4,
        "21.42.01.1000": 14.3,
        "28,06.500": 1.06,
        "28.08.500": 1.78,
        "30.06.100": 0.9,
        "30.08.100": 1.2,
        "80.60.250": 10.77,
        "80.60.500": 21.54,
        "80.82.250": 19.1,
        "93.01.300": 0.034,
        "93.02.200": 0.036,
        "93.08.200": 0.03,
        "93.20.200": 0.033,
        "93.21.300": 0.031,
        '28.06.500': 1.06,
        '10.09.04.100': 1.7,
        '10.09.03.100': 1.7,
        '01.30.500': 3.56,
        '14.16.500': 1.92,
        '86.91.100': 5.4,
        '15.30.1000': 5.3,
        '80.62.250': 10.77,

    });

    // useEffect(() => {
    //     fetch('/products_weights')
    //     .then((response) => {
    //         return response.json();
    //     console.log(response.json());
    //     })
    //     .then((data) => {
    //         setProductWeights(data);
    //     })
    // }, []);

    const handleSubmit = e => {
        e.preventDefault();
        console.log(pallets);
        fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pallets),
        });
    };


    const addPallet = newPallet => {
        setPallets([...pallets, { pid: shortid(), title: newPallet.title, items: [] }]);
    };

    const addCard = (newCard, palletId) => {
        const palletsUpdated = pallets.map(pallet => {
            if(pallet.pid === palletId)
                return { ...pallet, items: [...pallet.items, { id: shortid(), title: newCard.title, amount: newCard.amount }]}
            else
                return pallet
        })

        setPallets(palletsUpdated);

    };

    const addWeight = (newWeight, palletId) => {
        const palletsUpdated = pallets.map(pallet => {
            if (pallet.pid === palletId) {
                const updatedWeight = newWeight;
                return { ...pallet, weight: updatedWeight };
            } else {
                return pallet;
            }
        });
        setPallets(palletsUpdated);
    };


    const handleDeletePallet = (pid) => {
        const updatedPallets = pallets.filter((pallet) => pallet.pid !== pid);
        setPallets(updatedPallets);
    };

    const handleDeleteCard = (palletId, cardId) => {
        const updatedPallets = pallets.map(pallet => {
            if (pallet.pid === palletId) {
                const updatedItems = pallet.items.filter(item => item.id !== cardId);
                return { ...pallet, items: updatedItems };
            } else {
                return pallet;
            }
        });
        setPallets(updatedPallets);
    };
    return (
        <div className={styles.lists}>
            <p className={styles.description}>Please add first pallet plus products on it.</p>
            <section className={styles.columns}>
                {pallets.map(pallet => (
                    <Pallet
                        addCard={addCard}
                        addWeight={addWeight}
                        onDeletePallet={handleDeletePallet}
                        onDeleteCard={handleDeleteCard}  // Pass the function here
                        key={pallet.pid}
                        pid={pallet.pid}
                        title={pallet.title}
                        items={pallet.items}
                        weight={pallet.weight}
                        pw={Object.keys(productsWeights)}
                    />
                ))}
            </section>
            <PalletForm action={addPallet} />
            <form onSubmit={handleSubmit}>
                <Button type="submit">Generate PackingList</Button>
            </form>
            <div>
                <PackingList pallets={pallets} productsWeights={productsWeights}/>
            </div>
        </div>
    );
};

export default List;