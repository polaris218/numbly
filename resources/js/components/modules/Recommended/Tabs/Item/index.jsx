import React from 'react';
import classNames from 'classnames';

const Item = props => {
    const { active, text, onClick } = props;
    const wrapStyle = classNames({
        "recommended-tab": true,
        "recommended-tab--active": active
    });

    if (!text) {
        return;
    }
    
    return (
        <div className="recommended-tab-outer">
            <button 
                className={ wrapStyle }
                onClick={ onClick }
            >
                #{ text }
            </button>
        </div>
    );
};

export default Item;