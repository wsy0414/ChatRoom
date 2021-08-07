import React, { lazy, Suspense } from 'react';
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';

export const RootRouter: React.FC = () => {
    return (
        <>
            <HashRouter>
                <Suspense fallback>
                    <Switch>
                        <Route path="/login" component={LoginLazy} ></Route>
                        <Route path="/layout" component={LayoutLazy} ></Route>
                        <Redirect to="/login" />
                    </Switch>
                </Suspense>
            </HashRouter>
        </>
    );
}

const LoginLazy = lazy(() => import('../page/login/Login').then(({ Login }) => ({ default: Login })));
const LayoutLazy = lazy(() => import('./LayoutRouter').then(({ LayoutRouter }) => ({ default: LayoutRouter })));
