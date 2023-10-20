import styles from './PackingList.module.scss'
import List from '../List/List';
import {useEffect, useState} from "react";


const PackingList = (props) =>  {
    const [packingList,setPackingList] = useState([]);
    // const [productsWeights,setProductsWeights] = useState(props.productsWeights);


    useEffect(() => {
        // Merge based on the title property in items
        const mergedPallets = props.pallets.map(pallet => {
            const mergedItems = pallet.items.map(item => ({
                ...item,
                itemWeight: props.productsWeights[item.title] || 0,
                percentage: ((props.productsWeights[item.title] * item.amount))/(pallet.weight - 20),
            }));

            return {
                ...pallet,
                items: mergedItems,
            };
        });

        setPackingList(mergedPallets);
    }, [props.pallets, props.productsWeights]);

        return (
        <div>
            {/* Display your merged pallets data here */}
            {packingList.map(pallet => (
                <div key={pallet.pid}>
                    <p>Title: {pallet.title}</p>
                    <p>Weight: {pallet.weight}</p>
                    <ul>
                        {pallet.items.map(item => (
                            <li key={item.id}>
                                {item.title} - Amount: {item.amount} - Item Weight: {item.itemWeight} - Percentage: {item.percentage}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>

    )};


export default PackingList;
