import React, { useRef, useState } from "react";

function SignUp() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState<any>("");

  const handleSignUp = async () => {
    const response = await fetch("http://localhost:3002/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: emailRef.current?.value,
        email: emailRef.current?.value,
        password: passRef.current?.value,
      }),
    });

    const json = await response.json();

    setMessage(json);
  };
  return (
    <div>
      <h1>Create A New User</h1>
      {JSON.stringify(message)}
      <input type="text" placeholder="Name" ref={nameRef} />
      <input type="text" placeholder="Email" ref={emailRef} />
      <input type="password" placeholder="Password" ref={passRef} />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default SignUp;
