import React from "react"
import Home from "../../pages/Home"
import { useNavigate } from "react-router-dom"
import Loading from "../../atom/loading"

export default function LoginCard() {
    const navigate = useNavigate()

    const [visibility, setVisibility] = React.useState<string>("hide")

    const [logo, setLogo] = React.useState<string>("https://www.svgrepo.com/show/532463/eye-slash-alt.svg")

    const [type, setType] = React.useState<string>("password")

    const [loadingVisibility, setLoadingVisibility] = React.useState<string>("hidden")

    function handleLogo() {
        if(visibility === "hide") {
            setLogo("https://www.svgrepo.com/show/532492/eye-alt.svg")
            setType("text")
            setVisibility("show")
        }else if(visibility === "show") {
            setLogo("https://www.svgrepo.com/show/532463/eye-slash-alt.svg")
            setType("password")
            setVisibility("hide")
        }
    }

    function handleClose() {
        navigate("/")
    }

    function handleForm() {
        setLoadingVisibility("")
        setTimeout(() => {
            navigate("/dashboard")
        }, 500)
    }

    function handleHref() {
        setLoadingVisibility("")
        setTimeout(() => {
            navigate("/sign_up")
        }, 500)
    }

    return (
        <div className="relative">
            <Home />
            <div className="w-full h-screen absolute right-0 top-0">
                <div className="w-full h-screen fixed flex justify-center items-center backdrop-blur-sm">
                    <div className="flex flex-col p-5 bg-white rounded-lg border-[1px] border-black shadow-xl">
                        <div className="flex">
                            <h1 className="flex-1 text-4xl font-bold text-[#22577A]">Login</h1>
                            <button onClick={handleClose}>
                                <img src="https://www.svgrepo.com/show/500512/close-bold.svg" alt="" width={30} />
                            </button>
                        </div>

                        <form onSubmit={handleForm} className="flex flex-col gap-4 mt-8">
                            {/* email */}
                            <input 
                                type="email" 
                                name="email"
                                placeholder="Email" 
                                className="w-96 h-12 p-2 border-2 border-[#22577A] rounded-lg"
                            />

                            {/* password */}
                            <div className="relative">
                                <input 
                                    type={type} 
                                    name="password"
                                    placeholder="Password" 
                                    className="w-96 h-12 p-2 border-2 border-[#22577A] rounded-lg"
                                />
                                <div className="absolute top-2 right-2">
                                    <span onClick={handleLogo}>
                                        <img 
                                            src={logo} 
                                            alt="" 
                                            width={30}
                                        />
                                    </span>
                                </div>
                            </div>
                            
                            {/* button */}
                            <button type="submit">
                                <p className="p-2 font-medium text-white bg-[#38A3A5] rounded-lg">Login</p>
                            </button>
                        </form>
                        <p className="mt-5 text-center text-[#22577A]">Don't have an account ? Click <span onClick={handleHref} className="font-bold cursor-pointer">Here</span></p>
                    </div>
                </div>
                <div className={loadingVisibility}>
                    <Loading />
                </div>
            </div>
        </div>
    )
}