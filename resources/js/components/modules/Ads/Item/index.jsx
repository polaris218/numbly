import React, { useState } from 'react';
import classNames from 'classnames';
import Image from '@/ui/Image';
import formatNumber from '@/helpers/formatNumber';

const Item = ({ image, likes, cost, days }) => {
    const imageLink = `${ process.env.REACT_APP_STORAGE_URL }adposts/${ image }`;
    const [ visible, setVisible ] = useState(false);

    const outerStyle = classNames({
        'recommended-item': true,
        'recommended-item--hidden': !visible
    });

    return (
        <div className={ outerStyle }>
            <div className="recommended-item__wrap">
                <Image 
                    classes="recommended-item__img" 
                    src={ imageLink } 
                    alt=""
                    onLoad={ () => setVisible(true) }
                />
            </div>
            <div className="recommended-item__wrap">
                <div className="boost-stat__wrap">
                    <div className="boost-stat">
                        <i className="far fa-heart boost-stat__icon" />
                        <span className="boost-stat__text">{ formatNumber(likes) || 0 }</span>
                    </div>
                    <div className="boost-stat">
                        <i className="fas fa-dollar-sign boost-stat__icon" />
                        <span className="boost-stat__text">{ cost || 0 }</span>
                    </div>
                    <div className="boost-stat">
                        <i className="fas fa-calendar-day boost-stat__icon" />
                        <span className="boost-stat__text">{ days || 0 }</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;