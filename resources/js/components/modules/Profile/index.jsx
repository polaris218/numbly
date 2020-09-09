import React from 'react';
import { connect } from 'react-redux';

import DisableScroll from 'ui/DisableScroll';
import { parseBusiness } from 'helpers/profile';
import MainInfo from './Main';
import SocialBlock from './Social';
import CollectedData from './Collected';
import Interests from './Interests';
import Summary from './Summary';

const parseInstagram = ig => {
    if (!ig || !Object.keys(ig).length) {
        return undefined;
    }

    const { username, biography } = ig;
    return {
        name: username,
        link: `https://instagram.com/${ username }`,
        biography: biography
    };
};

const Profile = (props) => {
    const { data } = props;
    const { avatar = '', name = '', ig, hashtags } = data;
    const business = parseBusiness(data.business);
    const { 
        name: businessName, 
        interests = []
    } = business;
    const instagram = parseInstagram(ig);
    const facebook = {
        name,
        link: 'https://facebook.com/profile.php'
    };

    return (
        <div className="profile nimbly-page">
            <MainInfo 
                image={ avatar }
                name={ name }
                desc={ businessName }
            />
            <DisableScroll classes="profile-scrollable">
                <SocialBlock
                    type="Facebook"
                    { ...facebook }
                />
                { instagram && 
                    <SocialBlock
                        type="Instagram"
                        { ...instagram }
                    />
                }
                <CollectedData message="Data we collected" data={ hashtags } />
                <Summary { ...business } />
                <Interests message="Interests" data={ interests } />
            </DisableScroll>
        </div>
    );
};

const mapStateToProps = ({ profile }) => ({
    data: profile.data
});

export default connect(mapStateToProps)(Profile);