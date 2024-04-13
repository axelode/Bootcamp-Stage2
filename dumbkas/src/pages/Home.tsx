import React from "react"
import Navbar from "../components/home_comp/HomeNavbar"
import HomePage from "../components/home_comp/HomePage"
import Footer from "../components/Footer"
import Loading from "../atom/loading"

export default function Home(): React.JSX.Element { 
    return (
        <div className="relative">
            <Navbar />
            <HomePage />
            <Footer />
            <div className="absolute w-full h-screen top-0 left-0 hidden">
                <Loading />
            </div>
        </div>
    )
}