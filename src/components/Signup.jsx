import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../appwrite/Auth";
import { login } from "../store/authSlice";
import Button from "./Button";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "./loading/LoadingSpinner";
import { motion } from "framer-motion";

function Signup() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading]=useState(false)
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const create = async (data) => {
    setError("");
    try {
      setLoading(true)
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        setLoading(false)
      navigate('/')
      }
    } catch (error) {
      setError(error.message);
      setLoading(false)
    }
  };
if(loading){
  return(
    <LoadingSpinner/>
  )
}

  return (
    <div className="flex justify-center py-12 px-4 text-white px-4 font-Neue ">
      <motion.div 
       initial={{opacity:0 , scale:0.9}}
       whileInView={{opacity:1, scale:1}}
        transition={{duration:1.2 , ease:"easeInOut"}}
      className="loginCard w-full max-w-lg bg-[#2C2D31] px-auto p-10 rounded-lg  shadow-2xl">
        <h2 className=" text-center text-2xl font-Neue font-extralight text-white">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-white/60">
          Already have an account?{" "}
         <Link to='/login'>
         <span className="text-white/90">Sign In</span>
         </Link>
        </p>
        {/* pending applying link here  styling also*/}

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className=" gap-4 flex flex-col items-center text-white">
            <Input
              label="Name:"
              placeholder="Enter your Name"
              type="text"
              {...register("name", {
                required: true,
                // pattern pending
              })}
            />
            <Input
              label="Email:"
              placeholder="Enter your Email"
              type="email"
              {...register("email", {
                required: true,
                // pattern pending
              })}
            />
            <Input
              label="Password:"
              placeholder="Enter your Password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-1/2  mt-5 ">
              Create account
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Signup;
