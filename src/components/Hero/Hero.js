import styles from './Hero.module.scss';

const Hero = () => {
    return (
        <div className={styles.hero}>
            <h1 className={styles.title}>My first Pallet App</h1>
            <p className={styles.subtitle}>A simple app, with list of Pallets and nett/brutto weights</p>
        </div>
    );
};

export default Hero;