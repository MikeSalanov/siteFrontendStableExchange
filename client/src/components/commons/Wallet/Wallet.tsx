import { useContext, useEffect } from "react";
import { Context } from "../../../main";
import styles from"./Wallet.module.scss"
import { observer } from "mobx-react-lite";



function Wallet (): JSX.Element {

  const {wallet} = useContext(Context)


useEffect(() => {
  wallet.getBalance()
  wallet.getPublicAdress()
}, [])

  
const handleSubmit = () => {
navigator.clipboard.writeText(wallet.publicAddress).then(() => console.log('Address copied to clipboard:', wallet.publicAddress))
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
    <span className={styles.balance}>{`BALANCE: ${wallet.balance}`}</span>
    <img src="../../public/usdt.svg" alt="usdt-icon"></img>
    </div>
    <br />
    <br />
    <div className={styles.publicAddressContainer} >
      <span className={styles.publicAddress}>{`PUBLIC ADDRESS: ${wallet.publicAddress}`}</span>
      <img src="../../public/copy.svg" alt="copy-icon" onClick={handleSubmit}/>
    </div>
  </div>


  );
}
 
export default observer(Wallet);