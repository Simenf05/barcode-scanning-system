import { NavBar } from "./components/NavBar/NavBar";

import { FAQ } from "./pages/FAQ";
import { Lending } from "./pages/Lending";
import { Home } from "./pages/Home";
import { Return } from "./pages/Return";

import { RootRoute, Route, ReactRouter, RouterProvider  } from "@tanstack/react-router";


let rootRoute = new RootRoute({ component: NavBar })



const lendingRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'Lending',
    component: Lending
})

const faqRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'FAQ',
    component: FAQ
})

const homeRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Home
})

const returnRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'Return',
    component: Return
})



const routeTree = rootRoute.addChildren([
    homeRoute,
    faqRoute,
    lendingRoute,
    returnRoute
])

const router = new ReactRouter({ routeTree })


export default function App() {
    return (
        <RouterProvider router={ router } />
    );
}

