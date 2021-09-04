import { useState, useCallback } from 'react';
import { auth } from '../firebase';
import { withRouter } from 'react-router-dom';

const Reset = (props) => {

    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const dataProcess = (e) => {
        e.preventDefault();

        if(!email.trim()){
            /* console.log('Empty Email.'); */
            setError('Empty Email.');
            return
        }

        recoverPassword();
    }

    const recoverPassword = useCallback(
        async () => {
            try {
                await auth.sendPasswordResetEmail(email);
                console.log('Email sent');
                props.history.push('login');
            } catch (error) {
                setError(error.message);
            }
        },
        [email, props.history],
    )

    return (
        <div>
            <div className="mt-5">
                <h3 className="text-center">
                    Password Reset
                </h3>
                <hr />
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                        <form onSubmit={dataProcess}>
                            {
                                error && (
                                    <div className="alert alert-danger">{error}</div>
                                ) 
                            }
                            <input onChange={ (e) => setEmail(e.target.value)} value={email} type="email" className="form-control mb-2" placeholder="Enter an Email" />
                            
                            <button className="btn btn-warning btn-lg w-100 mb-2" type="submit">
                                Password Reset
                            </button>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Reset);