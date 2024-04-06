import React, { useState } from "react"
import DataWalletInterface from "../../interface/DataWalletInterface"
import DataWallet from "../../assets/static_data/dummy_data/dataWallet.json"

export default function WalletCard() {
    const [wallet, setWallet] = React.useState<DataWalletInterface[]>(DataWallet)

    return (
        <>
            {wallet.map((data: DataWalletInterface) => {
                const template = 
                    <div className="w-60 flex items-center gap-5 p-3 border-[1px] border-black rounded-lg shadow-xl">
                        <img 
                            src={data.image} 
                            alt=""
                            width={50} 
                        />
                        <div className="flex flex-col">
                            <p className="font-medium text-[#38A3A5]">{data.title}</p>
                            <p className="font-bold">Rp. {data.saldo}</p>
                        </div>
                    </div>

                return template
            })}
        </>
    )
}