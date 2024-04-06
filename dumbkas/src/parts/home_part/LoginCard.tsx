export default function LoginCard() {
    return (
        <div className="w-full h-screen fixed flex justify-center items-center backdrop-blur-sm z-50">
            <div className="flex flex-col p-5 bg-white rounded-lg border-[1px] border-black shadow-xl">
                <h1 className="text-4xl font-bold text-[#22577A]">Login</h1>
                <form action="" className="flex flex-col gap-4 mt-8">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="w-96 h-12 p-2 border-2 border-[#22577A] rounded-lg"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-96 h-12 p-2 border-2 border-[#22577A] rounded-lg"
                    />
                    <button>
                        <p className="p-2 font-medium text-white bg-[#38A3A5] rounded-lg">Login</p>
                    </button>
                </form>
                <p className="mt-5 text-center text-[#22577A]">Don't have an account ? Klik <span className="font-bold"><a href="">Here</a></span></p>
            </div>
        </div>
    )
}