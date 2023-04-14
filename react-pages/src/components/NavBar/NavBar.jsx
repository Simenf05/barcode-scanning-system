import {
    Outlet,
    Link
  } from '@tanstack/react-router'


export const NavBar = () => {
    return (
        <>
            <div>
                <div className="p-2">
                    <Link className="m-3 text-2xl" to="/admin/">
                        Home
                    </Link>{'  '}
                    <Link className="m-3 text-2xl" to="/admin/FAQ">
                        FAQ
                    </Link>{'  '}
                    <Link className="m-3 text-2xl" to="/admin/Lending">
                        Lending
                    </Link>{'  '}
                    <Link className="m-3 text-2xl" to="/admin/Return">
                        Return
                    </Link>
                </div>
                <hr/>
                <Outlet />
            </div>
        </>
    );
}

