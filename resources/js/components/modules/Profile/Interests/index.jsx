import React from 'react';

const Interests = ({ data, message }) => (
    <section className="profile-social">
        <div className="container container--limited profile-social__wrap">
            <p className="profile-social__net">{message}</p>
            <div className="profile-pool">
                { data && 
                    data.map((val, idx) => (
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
    </section>
);

export default Interests;