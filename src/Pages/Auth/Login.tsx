import { NavLink } from "react-router-dom"
import { useState } from "react"
import hideImg from "../../assets/Svg/Auth/Eye.svg"
import showImg from "../../assets/Svg/Auth/eye-closed.svg"

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="pt-10 flex flex-col gap-9">
            <div>
                <NavLink to="/register" className={({ isActive }) => (isActive ? "pb-3 border-b-4 border-blue-700" : "border-b-4 border-blue-50 pb-3")}>
                    <button className="w-56 text-left text-black font-bold text-base">
                        REGISTER
                    </button>
                </NavLink>
                <NavLink to="/login" className={({ isActive }) => (isActive ? "pb-3 border-b-4 border-blue-700" : "border-b-4 border-blue-50 pb-3")}>
                    <button className="w-56 text-left text-black font-bold text-base">
                        LOGIN
                    </button>
                </NavLink>
            </div>
            <div className="flex flex-col gap-6 items-center ">

                <h2 className=" text-4xl font-medium">
                    Welcome back
                </h2>

                <form className="w-full flex flex-col gap-6">

                    <div className="flex flex-col gap-3">
                        <label htmlFor="email" className="text-base font-normal">
                            Email
                        </label>

                        <input type="email" name="email"
                            id="email" placeholder="Enter your email"
                            required
                            className="text-base font-normal border border-gray-300 shadow rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500"
                        />
                    </div>

                    <div className="relative flex flex-col gap-3">
                        <label htmlFor="password" className="text-base font-normal">
                            Password
                        </label>

                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password" placeholder="Enter your password"
                            required
                            className="text-base font-normal border border-gray-300 shadow rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500"
                        />

                        <img
                            src={showPassword ? hideImg : showImg}
                            alt="show password"
                            className="absolute right-4 bottom-1.5 transform -translate-y-1/2 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>

                    <button type="submit" className="bg-blue-700 text-white font-semibold text-lg rounded-lg p-4">
                        Log In
                    </button>

                </form>

            </div>
        </div>
    )
}