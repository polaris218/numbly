import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from 'ui/Button';
import DisableScroll from 'ui/DisableScroll';
import { parseBusiness } from 'helpers/profile';
import Modal from './Modal';
import 'react-dropdown/style.css';

const Audience = props => {
    const {
        location: { state },
        history,
        modal,
        profile,
        hideAdModal,
    } = props;

    if (!state) {
        return (
            <Redirect to="/" />
        );
    }

    const business = parseBusiness(profile.business);
    const { 
        gender,
        min_age: minAge,
        max_age: maxAge,
        location,
        budget,
        interests = []
    } = business;

    const onCreateClick = () => {
        const { createAd, location: { state } } = props;
        const { image, caption } = state;
        createAd({
            image,
            caption
        });
    };
    
    return (
        <DisableScroll>
            <div className="create-post">
                <h2 className="create-post__title audience-title">Audience Summary</h2>
                <div className="container container--limited create-post__wrap">
                    <div className="profile-social__info audience-label">
                        <span className="audience-label__text">Gender:</span>
                        <span className="audience-age-input">{ gender }</span>
                    </div>
                    <div className="profile-social__info audience-label">
                        <span className="audience-label__text">Age:</span>
                        <div className="audience-age">
                            <span className="audience-age-input">{ minAge }</span>
                            <span className="audience-age-divider">—</span>
                            <span className="audience-age-input">{ maxAge }</span>
                        </div>
                    </div>
                    { location && (
                        <div className="profile-social__info audience-label audience-label--last">
                            <span className="audience-label__text">Location:</span>
                            <div className="audience-age">
                                <span className="audience-age-input">{ location }</span>
                            </div>
                        </div>
                    )}
                    { budget && (
                        <div className="profile-social__info audience-label audience-label--last">
                            <span className="audience-label__text">Daily Budget:</span>
                            <div className="audience-age">
                                <span className="audience-age-input">{ budget }</span>
                                <span className="audience-age-divider">CAD</span>
                            </div>
                        </div>
                    )}
                    <div className="audience-interest">
                        <p className="audience-label__text">Interests:</p>
                        <div className="profile-pool">
                            { interests && 
                                interests.map((val, idx) => (
                                    <span 
                                        key={ idx }
                                        className="profile-pool__item" 
                                    >
                                        { val.name }
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                    <div className="create-post__buttons create-post__buttons--centered">
                        <Button 
                            block 
                            accent
                            center 
                            type="button" 
                            classes="audience-submit create-post__btn" 
                            onClick={ onCreateClick }
                        >
                            Create an ad
                        </Button>
                    </div>
                    <Modal shown={ modal } history={ history } hideModal={ hideAdModal } />
                </div>
            </div>
        </DisableScroll>
    );
};

export default Audience;