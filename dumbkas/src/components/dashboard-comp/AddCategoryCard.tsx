export default function AddCategoryCard() {
    return (
        <div className="w-full h-screen fixed flex justify-center items-center backdrop-blur-sm z-50">
            <div className="flex flex-col p-5 bg-white rounded-lg border-[1px] border-black shadow-xl">
                <div className="flex">
                    <h1 className="flex-1 text-4xl font-bold text-[#22577A]">Add Category</h1>
                    <button>
                        <img src="https://www.svgrepo.com/show/500512/close-bold.svg" alt="" width={30} />
                    </button>
                </div>
                
                <form action="" className="flex flex-col gap-4 mt-8">
                    {/* catagory name */}
                    <div className="flex flex-col gap-[1px]">
                        <label htmlFor="category" className="font-medium text-[#22577A]">Category</label>
                        <input 
                            id="category"
                            type="text" 
                            placeholder="Category Name" 
                            className="w-96 h-12 p-2 border-2 border-[#22577A] rounded-lg"
                        />
                    </div>

                    {/* type */}
                    <div className="flex flex-col gap-[1px]">
                        <label className="font-medium text-[#22577A]">Type</label>
                        <select className="w-96 h-12 p-2 border-2 border-[#22577A] rounded-lg">
                            <option disabled selected hidden>Select Type</option>
                            <option value="income">Income</option>
                            <option value="outcome">Outcome</option>
                        </select>
                    </div>

                    {/* image */}
                    <div className="flex flex-col gap-[1px]">
                        <label className="font-medium text-[#22577A]">Category</label>
                        <input 
                            id="category"
                            type="file" 
                            placeholder="Category Name" 
                            className="w-96 h-12 p-2 border-2 border-[#22577A] rounded-lg"
                        />
                    </div>
                    <button>
                        <p className="p-2 font-medium text-white bg-[#38A3A5] rounded-lg">Save</p>
                    </button>
                </form>
            </div>
        </div>
    )
}