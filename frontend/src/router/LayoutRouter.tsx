import React, { lazy, Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';

export const LayoutRouter: React.FC = () => {

    return (
        <Suspense fallback>
            {/* <Route path="/layout/home" component={HomeLazy}/> */}
            <Route path="/layout/chatroom" component={ChatRoomLazy} />
            {localStorage.getItem('userName') ? null : <Redirect to="/login"/>}
        </Suspense>
    );
};

const ChatRoomLazy = lazy(() => import('../page/chatroom/ChatRoom').then(({ ChatRoom }) => ({ default: ChatRoom })));