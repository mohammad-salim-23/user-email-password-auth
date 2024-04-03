import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef= useRef(null);
  const handleForgetPassword=()=>{
    const email = emailRef.current.value;
    if(!email){
        console.log("please provide an email",emailRef.current.value);
        return;
    }
    else if( !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
     console.log("please write a valid email");
     return;
    }
    // send validation email
    sendPasswordResetEmail(auth,email)
    .then(()=>{
        alert("Please check your email")

    }).catch((error)=>{
        console.log(error);
    })
   
  }
    const handleLogin=(e)=>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInWithEmailAndPassword(auth,email,password)
        .then(result=>{
            if(result.user.emailVerified){
                console.log(result.user)
                setSuccess("Login Successfully")
            }
            else{
                alert("please verify your email")
            }
        }).catch((error)=>{
            setRegisterError("Error");
        })

        console.log(email,password);
    }
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  ref={emailRef}
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label onClick={handleForgetPassword} className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            {success && <p className="text-xl text-green-700">{success}</p>}
          {registerError && (
            <p className="text-xl text-red-800">{registerError}</p>
          )}
          <p>Please Register First <Link to="/register">Visit this website</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
