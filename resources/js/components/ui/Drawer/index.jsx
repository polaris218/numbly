import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { logout } from '@/actions/auth';
import { resetProfile } from '@/actions/profile';
import DisableScroll from '@/ui/DisableScroll';
import Logo from '@/assets/img/logo.png';
import menu from './menu';
import MenuItem from './MenuItem';

const Drawer = ({ visible = false, onItemClick, logout, data, resetProfile }) => {
    const style = classNames({
        "drawer": true,
        "drawer--hidden": !visible
    });

    const onLogoutClick = (e) => {
        onItemClick(e);
        logout(resetProfile);
    };
    
    const {
        name = undefined,
        avatar = undefined
    } = data;

    return (
        <aside className={ style }>
            <DisableScroll full classes="drawer__scroll-content">
                <div className="drawer-block drawer-block--light">
                    <div className="drawer-logo">
                        <img className="drawer-logo__img" src={ Logo } alt="Nimbly Logo" />
                    </div>
                    <div className="drawer-user">
                        <img className="drawer-user__img" src={ avatar } alt={ name || '' } />
                        <h2 className="drawer-user__name">{ name }</h2>
                    </div>
                </div>
                <div className="drawer-block drawer-block--padding">
                    <nav>
                        <ul className="drawer-menu">
                            { menu.map((val, idx) => (
                                <MenuItem 
                                    key={ idx } 
                                    onLogoutClick={ onLogoutClick }
                                    onItemClick={ onItemClick }
                                    { ...val }
                                />
                            )) }
                        </ul>
                    </nav>
                </div>
            </DisableScroll>
        </aside>
    );
};

const mapStateToProps = ({ profile }) => ({
    data: profile.data
});

const mapDispatchToProps = {
    logout,
    resetProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);