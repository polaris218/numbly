import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Content from 'containers/Content';
import Wrapper from 'modules/Wrapper';
import NotFound from 'modules/NotFound';

const renderComponent = (route, props) => (
    <Wrapper pageTitle={ route.pageTitle } { ...props }>
        <route.component { ...props } />
    </Wrapper>
);

export default routes => {
    return (
        <Fragment>
            <Content>
                <Switch>
                    { 
                        routes.map((route, index) => (
                            <Route
                                key={ index }
                                path={ route.path }
                                exact={ route.exact }
                                component={ props => renderComponent(route, props) }
                            />
                        ))
                    }
                    <NotFound />
                </Switch>
            </Content>
        </Fragment>
    );
};