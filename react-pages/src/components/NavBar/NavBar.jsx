import {
    Outlet,
    Link
  } from '@tanstack/react-router'


export const NavBar = () => {
    return (
        <>
            <div>
                <Link to="/">
                    Home
                </Link>{'  '}
                <Link to="/FAQ">
                    FAQ
                </Link>{'  '}
                <Link to="/Lending">
                    Lending
                </Link>{'  '}
                <Link to="/Return">
                    Return
                </Link>
                <hr/>
                <Outlet />
            </div>
        </>
    );
}

