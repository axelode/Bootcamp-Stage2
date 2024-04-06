import React from "react"
import Navbar from "../components/home_comp/HomeNavbar"
import HomePage from "../components/home_comp/HomePage"
import Footer from "../components/Footer"

import Signup from "../parts/home_part/SignupCard"
import Login from "../parts/home_part/LoginCard"

export default function Home(): React.JSX.Element { 
    return (
        <div className="relative">
            <Navbar />
            <HomePage />
            <Footer />
            <div className="w-full h-screen absolute right-0 top-0 hidden">
                {/* <Signup /> */}
                {/* <Login /> */}
            </div>
        </div>
    )
}