// pages/index.js
import FindOneForm from "../../components/FindOneForm";
import styles from "../styles/Home.module.css"
export default function Home() {
    return (
        <div className={styles.main}>
            <div className={styles.card}>
                <h2>Movies</h2>
                <FindOneForm database="sample_mflix" collection="movies" />
            </div>
            <div className={styles.card}>
                <h2>Airbnb</h2>
                <FindOneForm database="sample_airbnb" collection="listingsAndReviews" />
            </div>
            <div className={styles.card}>
                <h2>Shipwrecks</h2>
                <FindOneForm database="sample_geospatial" collection="shipwrecks" />
            </div>
        </div>

    );
}
