import { Link} from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser } from '../Config/userSlice';

import { ProfileDropdown } from "../ReUsable/ProfileDropdown";


export const Header = () => {
  const user = useSelector(selectUser)


 
  return (
    <div className="fixed top-0 left-0 z-20 w-full bg-white flex justify-between items-center px-28 py-6 shadow xl:px-12" >
      <div className="">
        <h2 className=" uppercase font-bold text-5xl text-blue-700">Chatter</h2>
      </div>
      <div className="flex gap-6 text-black text-base font-bold">
        <Link to="/" className="un">
          Home
        </Link>
        <a href="#about" className="un">
          About
        </a>
        <Link to="/" className="un">
          Contact
        </Link>
        <Link to="/" className="un">
          Blogs
        </Link>
      </div>
      <div>

        {user ?
          <div className="">
            <ProfileDropdown />
            {/* <Link to="/feed">
              <button className=" text-white font-normal text-lg bg-blue-700 rounded-lg py-3 w-36 hover:bg-blue-800 transition duration-500 ease-in-out">
                Feed
              </button>
            </Link> */}

          </div> :
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
        }
      </div>

    </div>
  );
}