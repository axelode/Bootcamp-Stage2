import React from "react"
import { useNavigate } from "react-router-dom"
import Loading from "../../atom/loading"

export default function Navbar(): React.JSX.Element {
    const navigate = useNavigate()

    const [visibility, setVisibility] = React.useState<string>("none")

    function handleSignUp() {
        setVisibility("block")
        setTimeout(() => {
            navigate("/sign_up")
        }, 500)
    }

    function handleLogin() {
        setVisibility("block")
        setTimeout(() => {
            navigate("/login")            
        }, 500)
    }

    return (
        <div className="relative">
            <div className="flex items-center p-4 px-20">
                <p className="flex-1 font-bold text-2xl text-[#22577A]">DumbKas</p>
                <div className="flex items-center gap-5 font-medium">
                    <button onClick={handleLogin}><p className="text-[#22577A]">Login</p></button>
                    <button onClick={handleSignUp}><p className="px-5 py-1.5 text-[#22577A] bg-[#C7F9CC] rounded-lg">Sign Up</p></button>
                </div>
            </div>
            <div className="w-full h-screen absolute" style={{display: visibility}}>
                <Loading />        
            </div>
        </div>
    )
}