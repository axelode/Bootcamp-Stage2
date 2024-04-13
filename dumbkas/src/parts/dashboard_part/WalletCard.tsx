import React, { useContext } from "react"
import { WalletContext } from "../../context/wallet_context"

export default function WalletCard(): React.JSX.Element {
    const { wallet } = useContext(WalletContext)

    return (
        <>
            {wallet.map((wallets) => {
                <div key={wallets.id} className="w-60 flex items-center gap-5 p-3 border-[1px] border-black rounded-lg shadow-xl">
                    <img 
                        src={wallets.image} 
                        alt=""
                        width={50} 
                    />
                    <div className="flex flex-col">
                        <p className="font-medium text-[#38A3A5]">{wallets.title}</p>
                        <p className="font-bold">Rp. {wallets.cash}</p>
                    </div>
                </div>
            })}
        </>
    )
}

// export default WalletCard