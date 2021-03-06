//routes/index.js
import React from 'react';
// import { Redirect } from "react-router-dom";
import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Rank from '../application/Rank';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Album from '../application/Album';

export default [
    {
        path: "/",
        element: <Home />,
        children: [
            {
                index: true,
                element: <Recommend />
            },
            {
                path: "recommend",
                element: <Recommend />,
                children: [
                    {
                        path: ":id",
                        element: <Album />,
                    }
                ]
            },
            {
                path: "singers",
                element: <Singers />
            },
            {
                path: "rank",
                element: <Rank />
            }
        ]
    }
]