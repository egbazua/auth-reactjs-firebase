import { Link, NavLink } from 'react-router-dom'
import { auth } from '../firebase';
import { withRouter } from 'react-router-dom';

const Navbar = (props) => {
    
    const userLogout = () =>{
        auth.signOut().then(() => {
            props.history.push('');
        })
    }

    return (
        <div className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand ms-2" to="/">AUTH</Link>
            <div>
                <div className="d-flex">
                    <NavLink className="btn btn-dark me-2" to="/" exact>
                        Home
                    </NavLink>
                    
                    {
                        props.firebaseUser !== null ? (
                            <NavLink className="btn btn-dark me-2" to="/admin" exact>
                                Admin
                            </NavLink>
                        ) : null
                    }

                    {
                        props.firebaseUser !== null ? (
                            <button onClick={() => userLogout()} className="btn btn-danger me-2">Logout</button>
                        ) : (
                            <NavLink className="btn btn-dark me-2" to="/login" exact>
                                Login
                            </NavLink>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default withRouter(Navbar);