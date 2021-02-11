import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';

import './PlaceItem.css';
import { Coordinates } from '../../types/places-types';
import { AuthContext } from '../../shared/context/auth-context';

interface PlaceItemProp {
    id: String;
    image: string;
    title: string;
    description: String;
    address: String;
    creatorId: String;
    coordinates: Coordinates;
}

const PlaceItem:React.FC<PlaceItemProp> = (props) => {
    const auth = useContext(AuthContext);

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

    const confirmDeleteHandler = () => {
        setShowConfirmModal(false);
        console.log("Deleting place...");
    }

    return (
        <React.Fragment>
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
                    Please note that this can be undone thereafter.
                </p>
            </Modal>
            <li className="place-item">
                <Card className="place-item__content">
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
                        {auth.isLoggedIn && (
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