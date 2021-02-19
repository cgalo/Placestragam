import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import type { Coordinates } from '../../types/places-types';
import './PlaceItem.css';

interface PlaceItemProp {
    id: string;
    image: string;
    title: string;
    description: string;
    address: string;
    creatorId: string;
    coordinates: Coordinates;
    onDeletePlace: (pId: string) => void;
}

const PlaceItem:React.FC<PlaceItemProp> = (props) => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const openMapHandler = () => setShowMap(true);

    const closeMapHandler = () => setShowMap(false);
    
    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    };

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    };

    const confirmDeleteHandler = async() => {
        setShowConfirmModal(false);
        console.log("Deleting place...");
        // Send delete request to the backend, as user confirmed to delete the place
        try {
            const method='DELETE', url="http://localhost:5000/api/places/" + props.id;
            const responseData = await sendRequest(url, method, null, {});
            props.onDeletePlace(props.id);          // Readjust the places list in UserPlaces
            console.log(responseData);
        } catch(err){
            // useHttpClient and ErrorModal are already handling the errors, nothing to do here
        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            <Modal 
                onCancel={closeMapHandler} 
                show={showMap}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className="map-container">
                    <Map coordinates={props.coordinates} zoom={16}/>
                </div>
            </Modal>
            <Modal 
                show={showConfirmModal}
                onCancel={cancelDeleteHandler}
                header="Are you sure?" 
                footerClass="place-item__modal-actions"
                footer={
                    <React.Fragment>
                        <Button 
                            inverse
                            onClick={cancelDeleteHandler}
                        >
                            CANCEL
                        </Button>
                        <Button 
                            danger
                            onClick={confirmDeleteHandler}
                        >
                            DELETE
                        </Button>
                    </React.Fragment>
                }
            >
                <p>
                    Do you want to proceed and delete this place? 
                    Please note that this can't be undone thereafter.
                </p>
            </Modal>
            <li className="place-item">
                <Card className="place-item__content">
                    {isLoading && <LoadingSpinner asOverlay />}
                    <div className="place-item__image">
                        <img src={props.image} alt={props.title} />                
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        {/* Buttons to allow the user to interact with the 'Place' */}
                        <Button inverse onClick={openMapHandler}>
                            VIEW ON MAP
                        </Button>
                        {auth.isLoggedIn && auth.userId === props.id && (
                            <React.Fragment>
                                <Button to={`/places/${props.id}`}>
                                    EDIT
                                </Button>
                                <Button 
                                    danger
                                    onClick={showDeleteWarningHandler}
                                >
                                    DELETE
                                </Button>
                            </React.Fragment>
                        )}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
}

export default PlaceItem;