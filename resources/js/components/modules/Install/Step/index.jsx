import React from 'react';

const Step = props => {
    const { img, desc, step } = props;
    const html = {
        __html: desc
    };

    return (
        <div className="install-step">
            <div className="install-step__wrap">
                <div className="install-step__number">{ step }</div>
                <p className="install-step__text" dangerouslySetInnerHTML={ html } />
            </div>
            { img && <img className="install-step__img" src={ img } alt="" /> }
        </div>
    );
};

export default Step;