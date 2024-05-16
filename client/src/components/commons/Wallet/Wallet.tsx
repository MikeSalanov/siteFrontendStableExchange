import { useContext, useEffect, useState } from "react";
import $api from "../../../http";
import { Context } from "../../../main";
import axios from "axios";
import styles from"./Wallet.module.scss"
import WalletService from "../../../services/WalletService";


// const wallets = [{balance: 100, publicAddress: "1e12sad"}, {balance: 200, publicAddress: "1ed1221fdsad"}, {balance: 300, publicAddress: "3asfdsf"}, {balance: 400, publicAddress: "4dse12sad"}, ]


function Wallet (): JSX.Element {

const [balance, setBalance] = useState<number>(0)
const [publicAddress, setPublicAddress] = useState<string>('')

  // const {store} = useContext(Context)



useEffect(() => {
   WalletService.getBalance().then(res => res.data).then(data =>  {
    console.log(data);
    setBalance(data.balance)
    setPublicAddress(data.publicAddress)
   })
}, [balance, publicAddress])


const handleSubmit = () => {
navigator.clipboard.writeText(publicAddress).then(() => console.log('Address copied to clipboard:', publicAddress))
.catch(error => {
  console.error('Failed to copy address:', error);
});

}

  return ( 
  <div className={styles.wallet}>
    <img src="../../public/wallet.svg" alt="wallet-icon" />
    <br />
    <br />
    <div className={styles.balanceContainer}>
    <span className={styles.balance}>{`BALANCE: ${balance}`}</span>
    <img src="../../public/usdt.svg" alt="usdt-icon"></img>
    </div>
    <br />
    <br />
    <div className={styles.publicAddressContainer} >
      <span className={styles.publicAddress}>{`PUBLIC ADDRESS: ${publicAddress}`}</span>
      <img src="../../public/copy.svg" alt="copy-icon" onClick={handleSubmit}/>
    </div>
  </div>


  );
}
 
export default Wallet;