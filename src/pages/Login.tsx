import React, { useRef, useState } from 'react'

function Login() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    const [message, setMessage] = useState<any>('');

    const handleLogin = async () => {
        const response = await fetch('http://localhost:3002/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": emailRef.current?.value,
                "password": passRef.current?.value
            }),
        });

        const json = await response.json();
    
        setMessage(json);
        // console.log(emailRef.current?.value, passRef.current?.value)
    }
    return (
        <div>
            {JSON.stringify(message)}
            <input type="text" placeholder="Email" ref={emailRef}/>
            <input type="password" placeholder="Email" ref={passRef}/>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login
