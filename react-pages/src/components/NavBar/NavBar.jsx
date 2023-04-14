import {
    Outlet,
    Link
  } from '@tanstack/react-router'


export const NavBar = () => {
    return (
        <>
            <div>
                <Link to="/admin/">
                    Home
                </Link>{'  '}
                <Link to="/admin/FAQ">
                    FAQ
                </Link>{'  '}
                <Link to="/admin/Lending">
                    Lending
                </Link>{'  '}
                <Link to="/admin/Return">
                    Return
                </Link>
                <hr/>
                <Outlet />
            </div>
        </>
    );
}

