import { Token } from './../types/Token';
import { EscrowHub } from './../types/EscrowHub';
import { createContext } from "react"

type EscrowContextProps = {
    signerAddress: string | undefined;
    escrowContract: EscrowHub | undefined;
    tokenContract: Token | undefined;
    provider: any;
    ensName: any;
    ensAvatar: any;
}

export const EscrowContext = createContext<EscrowContextProps>({
    signerAddress: undefined,
    escrowContract: undefined,
    tokenContract: undefined,
    provider: null,
    ensName: null,
    ensAvatar: null
})