import React from 'react';
import { Home, NoneAdmin } from "../dashboard";

export const authRoutes = [
    {
        path: "/home",
        component: (props) => <NoneAdmin {...props} />,
        exact: false
    }
];