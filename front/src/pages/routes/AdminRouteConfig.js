import React from 'react';
import { Home, NoneAdmin } from "../dashboard";

export const adminRoutes = [
    {
        path: "/home",
        component: (props) => <Home {...props} />,
        exact: false
    },
    {
        path: "/home1",
        component: (props) => <NoneAdmin {...props} />,
        exact: false
    }
];