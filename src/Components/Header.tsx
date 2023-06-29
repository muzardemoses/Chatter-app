import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { logout } from '../Config/userSlice';
import { auth, signOut } from '../Config/firebase';
import { toast } from 'react-toastify';


export const Header = () => {
  const dispatch = useDispatch();

  const SignOut = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        await signOut(auth);
        dispatch(logout);
        localStorage.removeItem("user");
        window.location.href = "/";
        toast.success("Logout successful");
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  const [show, setShow] = useState(false);
  
  return (
    <div className="fixed top-0 left-0 z-20 w-full bg-white flex justify-between items-center px-28 py-6 shadow">
      <div className="">
        <h2 className=" uppercase font-bold text-5xl text-blue-700">Chatter</h2>
      </div>
      <div className="flex gap-6 text-black text-base font-bold">
        <Link to="/" className="un">
          Home
        </Link>
        <Link to="/about" className="un">
          About
        </Link>
        <Link to="/about" className="un">
          Contact
        </Link>
        <Link to="/about" className="un">
          Blogs
        </Link>
      </div>
      <div className="flex gap-6">
        <Link to="/login">
          <button className=" text-blue-900 font-normal text-lg box-border border border-blue-700 rounded-lg py-3 w-36 hover:bg-gray-50 transition duration-500 ease-in-out">
            Log In
          </button>
        </Link>
        <Link to="/register">
          <button className=" text-white font-normal text-lg bg-blue-700 rounded-lg py-3 w-36 hover:bg-blue-800 transition duration-500 ease-in-out">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}