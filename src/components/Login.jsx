import { useState, useCallback } from 'react';
import { auth } from '../firebase';

const Login = () => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(null);
    const [isRegister, setIsRegister] = useState(true);

    const dataProcess = (e) => {
        e.preventDefault();

        if(!email.trim()){
            /* console.log('Empty Email.'); */
            setError('Empty Email.');
            return
        }

        if(!pass.trim()){
            /* console.log('Empty Password.'); */
            setError('Empty Password.');
            return
        }

        if(pass.length < 6 ){
            /* console.log('Password less than 6 characters.'); */
            setError('Password more than 5 characters.');
            return
        }

        setError(null);
        /* console.log("Verified validations."); */

        if(isRegister){
            userRegister();
        }

    }

    const userRegister = useCallback(async() => {
        try {
            const answer = await auth.createUserWithEmailAndPassword(email, pass);
            console.log(answer.user);
        } catch (error) {
            console.log(error);
            if(error.code === 'auth/invalid-email'){
                setError('Invalid Email');
            }

            if(error.code === 'auth/email-already-in-use'){
                setError('Email already exists')
            }
        }
    }, [email, pass])

    return (
        <div className="mt-5">
            <h3 className="text-center">
                {
                    isRegister ? 'User Registration' : 'User Login'
                }
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
                        <input onChange={ (e) => setPass(e.target.value)} value={pass} type="password" className="form-control mb-2" placeholder="Enter a Password" />
                        <button className="btn btn-dark btn-lg w-100 mb-2" type="submit">
                            {
                                isRegister ? 'Sign Up' : 'Sign In'
                            }
                        </button>
                        <button onClick={() => setIsRegister(!isRegister)} type="button" className="btn btn-primary btn-sm w-100">
                            {
                                isRegister ? 'Do you already have an account?' : 'You do not have an account?'
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;