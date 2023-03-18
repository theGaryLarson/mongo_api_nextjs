import { useState } from "react";
import styles from "./FindOneForm.module.css"
function FindOneForm({ database, collection }) {
    const [result, setResult] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        const filter = JSON.parse(event.target.filter.value);
        const projection = JSON.parse(event.target.projection.value);

        const json_response = await fetch("/api/findOne", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ database, collection, filter, projection }),
        });

        const result = await json_response.json();
        setResult(JSON.stringify(result));
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="filter-input">Filter:</label>
                        <input
                            type="text"
                            id="filter-input"
                            name="filter"
                            placeholder="e.g. { property_type: 'Apartment', bedrooms: 2, beds: 2 }"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="projection-input">Projection:</label>
                        <input
                            type="text"
                            id="projection-input"
                            name="projection"
                            placeholder="e.g. { id: 1, listing_url: 1, name: 1, summary: 1, property_type: 1, bedrooms: 1, beds: 1 }"
                            required
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <button type="submit">Find One</button>
                    </div>
                </form>
                <div>{(() => {
                    if (collection === "movies") {
                        return (
                            <div className={styles.moviesResult}>
                                <img src={JSON.parse(result).poster} alt="Movie poster" />
                                <div>{JSON.parse(result).title}</div>
                            </div>
                        );
                    } else if (collection === "ListingsAndReviews") {
                        return (
                            <div>
                                {result}
                            </div>
                        );
                    } else if (collection === "shipwrecks") {
                        return <div className={styles.description}>{result}</div>;
                    }
                })()}</div>
            </div>
        </>
    );
}

export default FindOneForm;
