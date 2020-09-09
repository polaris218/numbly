import React from 'react';

const Empty = ({ title, desc }) => {
    const htmlDescription = {
        __html: desc
    };
    return (
        <div className="empty">
            <div className="container container--limited">
                <div className="empty__wrap">
                    <h2 className="empty__title">{ title }</h2>
                    <p className="empty__desc" dangerouslySetInnerHTML={ htmlDescription }></p>
                </div>
            </div>
        </div>
    );
};

export default Empty;