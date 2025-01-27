import { useParams, Link } from 'react-router-dom'
import * as cargoService from '../../services/cargoService'
import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';

const CargoDetails = (props) => {
    const { cargoId } = useParams();
    const [cargo, setCargo] = useState(null);
    const user = useContext(AuthedUserContext);

    useEffect(() => {
        const fetchCargo = async () => {
            const cargoData = await cargoService.show(cargoId);
            console.log("Fetched Cargo Data:", cargoData); // Check the data
            if (cargoData) {
                setCargo(cargoData);
            } else {
                console.error("No cargo found for this ID.");
            }
        };
        fetchCargo();
    }, [cargoId]);

    if (cargo === null) {
        return <div>Loading...</div>;
    }

    if (!cargo || !cargo.author) {
        return <div>Error loading cargo details. Please try again.</div>;
    }

    return (
        <main>
            <header>
                <p>{cargo.type.toUpperCase()}</p>
                <h1>{cargo.trade}</h1>
                <p>
                    {cargo.author.username} posted on {new Date(cargo.createdAt).toLocaleDateString()}
                </p>
                <p>{cargo.notes}</p>

                {cargo.author._id === user._id && (
                    <>
                    <Link to={`/cargos/${cargoId}/edit`}>Edit</Link>
                        <button onClick={() => props.handleDeleteCargo(cargoId)}>Delete Inquiry</button>
                    </>
                )}
            </header>
        </main>
    );
};

export default CargoDetails;
