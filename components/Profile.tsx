import { useCallback, useContext, useState } from "react";
import { EscrowContext } from "../contexts/EscrowContext";
import Image from "next/image";
import { collapseAddress } from "./CopyAbleAddress";
import {
  useAllowedBalanceQuery,
  useApproveTokensMutation,
  useBalanceQuery,
  useDecimalsQuery,
  useSymbolQuery,
} from "../lib/queries";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import Link from "next/link";
import { useRouter } from "next/router";
import CovalentBalance from './CovalentBalance';


export const Profile = ({ logOut }: any) => {
  const router = useRouter();
  const { signerAddress, ensAvatar, ensName } = useContext(EscrowContext);

  const { data: decimals } = useDecimalsQuery();
  const { data: balance, isLoading: balanceLoading } = useBalanceQuery();
  const { data: allowedBalance, isLoading: allowedBalanceLoading } =
    useAllowedBalanceQuery();
  const { data: symbol } = useSymbolQuery();

  const { mutateAsync: approveTokens } = useApproveTokensMutation();

  const allowTokensPrompt = useCallback(() => {
    Swal.fire({
      title: "How many tokens do you want to allow?",
      input: "number",
      inputValue: ethers.utils.formatUnits(
        allowedBalance ?? 0.1,
        decimals ?? 18
      ),
      inputAttributes: {
        autocapitalize: "off",
        min: "0",
        step: "any",
      },
      showCancelButton: true,
      confirmButtonText: "Allow",
      showLoaderOnConfirm: true,
      preConfirm: (numberOfTokens: number) => {
        if (numberOfTokens <= 0) {
          return Promise.reject(
            "Number of tokens must be larger then zero."
          ).catch((error) => {
            Swal.showValidationMessage(
              "Number of tokens must be larger then zero."
            );
          });
        } else {
          return approveTokens(numberOfTokens).catch((error) => {
            Swal.showValidationMessage(error.message);
          });
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Approved!", "", "success");
      }
    });
  }, [allowedBalance, decimals, approveTokens]);

  return (
		<div className="d-flex  profile">
          {/* <Image
            src={ensAvatar ?? `https://i.pravatar.cc/75?u=${signerAddress}`}
            alt={ensName ?? signerAddress}
            width={75}
            height={75}
            layout="fixed"
          /> */}
          <div className="ml-2 profile-meta">
            <div>
              <p className="d-flex align-items-center">
              <b>Address&nbsp;</b>  {ensName ?? collapseAddress(signerAddress ?? "")}
              
          </p>
        
              <p>
                <b className="bold">Total</b>{" "}
                <span className="balance">
              {ethers.utils.formatUnits(balance ?? 0, decimals ?? 18)} 
              {/* <CovalentBalance></CovalentBalance> */}
                </span>{" "}
                {symbol}
          </p>
          
        
              {!allowedBalanceLoading && (
                <p className="d-flex align-items-center">
                  <span>
                    <b className="bold">Allowed</b>{" "}
                    <span className="balance">
                      {ethers.utils.formatUnits(
                        allowedBalance ?? 0,
                        decimals ?? 18
                      )}
                    </span>{" "}
                    {symbol}
              </span>
              <span>
</span>
                </p>
            
          ) }
          <div style={ {
            display: "flex", marginTop: "10px"}}>
                <button
                          className="btn btn-success btn-sm"
                          onClick={allowTokensPrompt}
                        >
                          Allow More
                </button>
                <button
                    className="btn btn-danger btn-sm ms-3"
                    onClick={() =>
                      confirm("Are You Sure to Sign Out?") ? logOut() : null
                    }
                  >
                    Log Out
              </button> 
            </div>
            </div>
          </div>
        </div>



		
 

      
	 
  );
};
