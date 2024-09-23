import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/Auth";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";
import Input from "./Input";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "./loading/LoadingSpinner";
import { motion } from "framer-motion";
function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (data) => {
    setLoading(true);
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        // empty parameters pending error
        if (userData) dispatch(authLogin(userData));
        navigate("/");
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex  justify-center py-12 text-white px-4 font-Neue ">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="loginCard w-full max-w-lg bg-[#2C2D31] px-auto p-10 rounded-lg  shadow-2xl"
          >
            <h2 className=" text-center text-2xl font-Neue font-extralight text-white">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-base text-white/60">
              Don't have any account?
              <Link to="/signup">
                <span className="text-white/90">Sign Up</span>
              </Link>
            </p>
            {/* pending applying link here  styling also*/}

            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(login)} className="mt-8">
              <div className=" gap-4 flex flex-col items-center text-white">
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
                  Sign In
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default Login;
