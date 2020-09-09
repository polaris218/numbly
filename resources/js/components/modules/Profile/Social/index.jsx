import React from 'react';
import Button from 'ui/Button';

const SocialBlock = ({ type, name = '', id, link, biography }) => (
    <section className="profile-social">
        <div className="container container--limited profile-social__wrap">
            <p className="profile-social__net">{ type }</p>
            <h3 className="profile-social__info">Name: 
                <span className="profile-social__info--data">{ name }</span>
            </h3>
            { id &&
                <p className="profile-social__info profile-social__info--last">ID: 
                    <span className="profile-social__info--data">{ id }</span>
                </p>
            }
            { biography &&
                <p className="profile-social__info profile-social__info--last">Biography: 
                    <span className="profile-social__info--data">{ biography }</span>
                </p>
            }
            <Button 
                accent
                block 
                outside 
                disabled={ !link }
                to={ link }
                target="_blank" 
                rel="noopener norefferer nofollow" 
            >My { type } account</Button>
        </div>
    </section>
);

export default SocialBlock;