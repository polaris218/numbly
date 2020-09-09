import React from 'react';

const Summary = props => {
    const { 
        min_age: minAge, 
        max_age: maxAge, 
        gender, 
        location, 
        budget
    } = props;
    return (
    <section className="profile-social">
        <div className="container container--limited profile-social__wrap">
            <p className="profile-social__net">Audience Summary</p>
            <p className="profile-social__info profile-social__info--last">
                <span className="profile-summary__title">Gender:</span>
                <span className="profile-social__info--data">{ gender }</span>
            </p>
            <p className="profile-social__info profile-social__info--last profile-summary__title">
                <span className="profile-summary__title">Age:</span>
                <span className="audience-age profile-summary__age-wrap">
                    <span className="profile-social__info--data audience-age-input profile-summary__age">{ minAge }</span>
                    <span className="audience-age-divider profile-summary__divider">—</span>
                    <span className="profile-social__info--data audience-age-input profile-summary__age">{ maxAge }</span>
                </span>
            </p>
            { location && (
                <p className="profile-social__info profile-social__info--last profile-summary__title">
                    <span className="profile-summary__title">Location:</span>
                    <span className="profile-social__info--data">{ location }</span>
                </p> 
            )}
            { budget && (
                <p className="profile-social__info profile-social__info--last profile-summary__title">
                    <span className="profile-summary__title">Daily Budget:</span>
                    <span className="audience-age profile-summary__budget-wrap">
                        <span className="profile-social__info--data audience-age-input profile-summary__budget">{ budget }</span>
                        <span className="profile-summary__currency">CAD / Day</span>
                    </span>
                </p>
            )}
        </div>
    </section>
);
    };

export default Summary;