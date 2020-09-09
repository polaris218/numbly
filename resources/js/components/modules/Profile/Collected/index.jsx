import React from 'react';
import HashTag from 'ui/HashTag';

const CollectedData = ({ data, message }) => (
    <section className="profile-social">
        <div className="container container--limited profile-social__wrap">
            <p className="profile-social__net">{message}</p>
            <div className="profile-pool">
                { data && data.map((val, idx) => <HashTag className="profile-pool__item" key={ idx } tag={ val } />) }
            </div>
        </div>
    </section>
);

export default CollectedData;