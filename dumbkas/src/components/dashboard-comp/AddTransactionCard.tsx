export default function AddTransactionCard() {
    return (
        <div className="w-full h-screen fixed flex justify-center items-center backdrop-blur-sm z-50">
            <div className="flex flex-col p-5 bg-white rounded-lg border-[1px] border-black shadow-xl">
                <div className="flex">
                    <h1 className="flex-1 text-4xl font-bold text-[#22577A]">Add Transaction</h1>
                    <button>
                        <img src="https://www.svgrepo.com/show/500512/close-bold.svg" alt="" width={30} />
                    </button>
                </div>
                
                <form action="" className="flex flex-col gap-4 mt-8">
                    {/* amount */}
                    <div className="flex flex-col gap-[1px]">
                        <label htmlFor="amount" className="font-medium text-[#22577A]">Amount</label>
                        <input 
                            id="amount"
                            type="number" 
                            placeholder="Amount" 
                            className="w-96 h-12 p-2 border-2 border-[#22577A] rounded-lg"
                        />
                    </div>

                    {/* date */}
                    <div className="flex flex-col gap-[1px]">
                        <label htmlFor="date" className="font-medium text-[#22577A]">Date</label>
                        <input 
                            id="date"
                            type="date" 
                            placeholder="Date" 
                            className="w-96 h-12 p-2 border-2 border-[#22577A] rounded-lg"
                        />
                    </div>

                    {/* category */}
                    <div className="flex flex-col gap-[1px]">
                        <label className="font-medium text-[#22577A]">Category</label>
                        <select className="w-96 h-12 p-2 border-2 border-[#22577A] rounded-lg">
                            <option disabled selected hidden>Select Category</option>
                            <option value="">Sallary</option>
                            <option value="">Family</option>
                            <option value="">Food</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-[1px]">
                        <label htmlFor="note" className="font-medium text-[#22577A]">Note</label>
                        <textarea className="p-2 border-2 border-[#22577A] rounded-lg resize-none	">Note</textarea>
                    </div>
                    <button>
                        <p className="p-2 font-medium text-white bg-[#38A3A5] rounded-lg">Save</p>
                    </button>
                </form>
            </div>
        </div>
    )
}