import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import './Register.css';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import SocialLogIn from '../SocialLogIn/SocialLogIn';
import { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';

const Register = () => {

    const [agree, setAgree] = useState(false);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const navigate = useNavigate();

    const navigateLogIn = () => {
        navigate('/login');
    }

    if (loading || updating) {
        return <Loading></Loading>
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name })
        alert('Updated Profile');
        navigate('/home');
    }

    return (
        <div className='register-form'>
            <h2 style={{ textAlign: 'center' }}>Please Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" name="name" id="" placeholder='Your Name' />
                <input type="email" name="email" id="" placeholder='Your Mail' required />
                <input type="password" name="password" id="" placeholder='Password' required />
                <input onClick={() => setAgree(!agree)} type="checkbox" name="terms" id="terms" />
                {/* <label className={agree ? 'ps-2 text-success' : 'ps-2 text-danger'} htmlFor="terms">Accept Terms & Conditions</label> */}
                <label className={`ps-2 ${agree ? 'text-success' : 'text-danger'}`} htmlFor="terms">Accept Terms & Conditions</label>
                <input
                    disabled={!agree}
                    className='w-50 mx-auto btn btn-primary mt-2'
                    type="submit"
                    value="Register" />
            </form>
            <p>Already have an account? <Link to="/login" className='text-primary pe-auto text-decoration-none' onClick={navigateLogIn}>
                Please LogIn
            </Link></p>
            <SocialLogIn></SocialLogIn>
            
        </div>
    );
};

export default Register;