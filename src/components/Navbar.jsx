import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand ms-2" to="/">AUTH</Link>
            <div>
                <div className="d-flex">
                    <NavLink className="btn btn-dark me-2" to="/" exact>
                        Home
                    </NavLink>
                    <NavLink className="btn btn-dark me-2" to="/admin" exact>
                        Admin
                    </NavLink>
                    <NavLink className="btn btn-dark me-2" to="/login" exact>
                        Login
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Navbar;