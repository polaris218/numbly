import React from 'react';

const MainInfo = ({ image, name = '', desc = '' }) => (
    <section className="profile-main">
    <div className="container container--limited profile-main__wrap">
        <img className="profile-main__img" src={ image } alt={ name }/>
        <div className="profile-main-info">
            <h2 className="profile-main-info__name">{ name }</h2>
            <p className="profile-main-info__desc">{ desc }</p>
        </div>
    </div>
</section>
);

export default MainInfo;