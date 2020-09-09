import React from 'react';

const HashTag = ({ tag: { name = '' }, ...rest }) => (
    <span { ...rest }>{ name }</span>
);

export default HashTag;