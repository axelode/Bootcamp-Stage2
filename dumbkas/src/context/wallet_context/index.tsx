import { createContext } from "react"
import { DataWalletInterface } from "../../interface/DataWalletInterface"

type WalletContextType = {
    wallet: DataWalletInterface[],
    setWallet: React.Dispatch<React.SetStateAction<DataWalletInterface[]>>
}

export const WalletContext = createContext<WalletContextType>({
    wallet: [],
    setWallet: () => { }
})