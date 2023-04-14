import { NavBar } from "./components/NavBar/NavBar";

import { FAQ } from "./pages/FAQ";
import { Lending } from "./pages/Lending";
import { Home } from "./pages/Home";
import { Return } from "./pages/Return";

import { RootRoute, Route, ReactRouter, RouterProvider  } from "@tanstack/react-router";


let rootRoute = new RootRoute({ component: NavBar })


const adminRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'admin',

})

const lendingRoute = new Route({
    getParentRoute: () => adminRoute,
    path: 'Lending',
    component: Lending
})

const faqRoute = new Route({
    getParentRoute: () => adminRoute,
    path: 'FAQ',
    component: FAQ
})

const fallbackRoute = new Route({
    getParentRoute: () => adminRoute,
    path: '/*',
    component: Home
})

const returnRoute = new Route({
    getParentRoute: () => adminRoute,
    path: 'Return',
    component: Return
})


const routeTree = rootRoute.addChildren([
    adminRoute.addChildren([
        faqRoute,
        lendingRoute,
        returnRoute,
        fallbackRoute,
    ])
])

const router = new ReactRouter({ routeTree })


export default function App() {
    return (
        <RouterProvider router={ router } />
    );
}

