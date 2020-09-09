import React from 'react';
import { ReactComponent as LoadingSpin } from 'assets/svg/loader.svg';

const Loader = ({ classes = '' }) => (
    <div className={ classes }>
        <LoadingSpin />
    </div>
);

export default Loader;