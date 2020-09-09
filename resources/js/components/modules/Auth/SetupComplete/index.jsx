import React from 'react';
import Button from '@/ui/Button';
import DisableScroll from '@/ui/DisableScroll';

const SetupComplete = () => (
    <DisableScroll>
        <div className="complete">
            <div className="container container--limited complete__wrap">
                <h2 className="collecting__logo">Nimbly</h2>
                <p className="complete__desc">Profile has been successfully created. You can now&nbsp;choose from recommended content on&nbsp;the following page to&nbsp;get started posting and boosting posts to&nbsp;your profile</p>
                <Button center block accent to="/">Let&rsquo;s go</Button>
            </div>
        </div>
    </DisableScroll>
);

export default SetupComplete;