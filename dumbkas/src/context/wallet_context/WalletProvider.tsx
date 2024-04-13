import { useCallback, useEffect, useState } from "react"
import { WalletContext } from "."
import { DataWalletInterface } from "../../interface/DataWalletInterface"
import apis from "../../libs/apis"

export function WalletProvider({ children }: React.HTMLAttributes<HTMLDivElement>) {
    const [wallet, setWallet] = useState<DataWalletInterface[]>([])

    const getWallet = useCallback(async () => {
        const response = await apis.get("/tableMain1")
        setWallet(response.data)
    }, [])

    useEffect(() => {
        getWallet()
    }, [getWallet])

    return (
        <WalletContext.Provider value={{ wallet, setWallet }}>
            { children }
        </WalletContext.Provider>
    )
}