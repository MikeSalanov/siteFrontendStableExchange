



function Wallet () {



  return ( 
  <div className="wallet">
    <img src="" alt="wallet-icon" />
    <span className="balance">{`BALANCE: ${}`}</span>
    <div>
      <span className="public-address">{`PUBLIC ADDRESS: ${}`}</span>
      <img src="" alt="copy-icon" />
    </div>
  </div>


  );
}
 
export default Wallet;