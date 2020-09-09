import React from 'react';
import DisableScroll from 'ui/DisableScroll';
import { isIOS } from 'helpers/device';
import Step from './Step';
import iosSteps from './ios';
import androidSteps from './android';

const Install = props => {
    const isIOSDevice = isIOS();
    return (
        <div className="install nimbly-page">
            <DisableScroll>
                <div className="install-wrap container container--limited">
                    <div className="install-head">
                        <h2 className="install-head__title">Installing our app might improve your experience</h2>
                        <p className="install-head__desc">Here&rsquo;s a&nbsp;step-by-step guide on&nbsp;how&nbsp;to&nbsp;install:</p>
                    </div>
                    { isIOSDevice && iosSteps.map((val, idx) => <Step key={ idx } { ...val } />) }
                    { !isIOSDevice && androidSteps.map((val, idx) => <Step key={ idx } { ...val } />) }
                </div>
            </DisableScroll>
        </div>
    );
};

export default Install;