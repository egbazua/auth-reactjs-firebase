import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { withRouter } from 'react-router';
import Firestore from './Firestore';

const Admin = (props) => {
    
    const [user, setUser] = useState(null);

    useEffect(() => {
        
        if(auth.currentUser){
            console.log('There is a user.')
            setUser(auth.currentUser);
        }else{
            console.log('User does not exist.');
            props.history.push('/login');
        }

    }, [props.history]);

    return (
        <div>
           {/* <h2>Hola admin</h2>  */}
           {
               user && (
                   <Firestore user={user}/>
               )
           }
        </div>
    )
}

export default withRouter(Admin);