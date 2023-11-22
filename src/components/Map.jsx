import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    return (<div className={styles.mapContainer} onClick={() => navigate("form")}>
        <h1>Map</h1>
        <p>Position: {lat}, {lng}</p>
    </div>);
}

export default Map;