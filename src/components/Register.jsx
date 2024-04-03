import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useState } from "react";
import auth from "../firebase.config";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
 const [show,setShow] = useState(false);
  const handleHeroRegister = (e) => {
    e.preventDefault();
    setSuccess("");
    setRegisterError("");
 const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.accepted;

    if (password.length < 6) {
      setRegisterError("Password must be at least 6 characters long");
      return;
    }
    else if(!/[A-Z]/.test(password)){
            setRegisterError("Your password should have at least one uppercase characters");
            return;
    }
  else if(accepted){
    setRegisterError("please accept our terms and conditions")
    return;
  }
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        setSuccess("User created successfully");
//    update profile
   updateProfile(result.user,{
    displayName:name,
   
   }).then(()=>{
     
        console.log("profile updated")
      
   }).catch(error=>{
   console.log(error);
   })

    //   send verification email
     sendEmailVerification(result.user)
     .then(()=>{
        alert("please checked your email and verify your account")
     })
      })
      .catch((error) => {
        console.error("Error:", error);
        setRegisterError(error.message);
      });
  };

  return (
    <div className="border">
      <div className="mx-auto md:w-1/2">
        <h2 className="text-2xl mb-7">Please, Register Sir</h2>
        <form onSubmit={handleHeroRegister}>
          <div className="">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="name"
              placeholder="Your Name"
              name="name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="relative">
           
           
           <input
              type={show ? "text":"password"}
              placeholder="Password"
              className="input input-bordered"
              name="password"
            
              required
             
            />
             <span className="absolute top-3 -right-44 w-full" onClick={()=>(setShow(!show))}>
                {
                    show ? <FaEyeSlash/>:<FaEye/>
                }
             </span>
          
          
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="space-x-2">
          <input className=" mb-2" type="checkbox" name="terms" id="terms" />
          <label  htmlFor="terms">Accept Our <a href="">Terms and Conditions</a> </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-secondary">Register</button>
          </div>
          {success && <p className="text-xl text-green-700">{success}</p>}
          {registerError && (
            <p className="text-xl text-red-800">{registerError}</p>
          )}
             <p>You have already an account <Link to="/login">Login here</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
