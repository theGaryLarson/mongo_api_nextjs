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
        setResult(result);
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="filter-input">Filter:</label>
                        <input
                            type="text"
                            id="filter-input"
                            name="filter"
                            placeholder={collection === "movies" ? '{ "plot":"", "runtime":"", "rated":"", "poster":"", "title":"", "fullplot":"", "released":""}' :
                                collection === "listingsAndReviews" ? '{"listing_url":"", "name":"", "summary":"","room_type":"", "accommodates":"", "bedrooms":"", "beds":""}' :
                                    collection === "shipwrecks" ? '{"feature_type":"", "chart":"", "latdec":"", "londec":"", ':
                                        "Enter filter here"}
                            required
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="projection-input">Projection:</label>
                        <input
                            type="text"
                            id="projection-input"
                            name="projection"
                            placeholder={collection === "movies" ? "Enter movie projection here" :
                                collection === "listingsAndReviews" ? "Enter listing projection here" :
                                    collection === "shipwrecks" ? "Enter shipwreck projection here" :
                                        "Enter projection here"}
                            required
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <button type="submit">Find One</button>
                    </div>
                </form>
                <div>{(() => {
                    if (collection === "movies") {
                        if (result.poster)
                        return (
                            <div className={styles.moviesResult}>
                                <img src={result.poster} alt="Movie poster" />
                                <div>
                                    {result.title}
                                    <p>{result.fullplot}</p>

                                </div>
                            </div>
                        );
                    } else if (collection === "ListingsAndReviews") {
                        return (
                            <div>
                                {JSON.stringify(result)}
                            </div>
                        );
                    } else if (collection === "shipwrecks") {
                        return <div>{JSON.stringify(result)}</div>;
                    } else {
                        return <div>{JSON.stringify(result)}</div>
                    }
                })()}</div>
            </div>
        </>
    );
}

export default FindOneForm;
