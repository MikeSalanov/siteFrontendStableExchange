import { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import Store from './store/store.ts';
import Wallet from './store/wallet.ts';
import { spy } from 'mobx';import Exchanges from './store/exchanges.ts'


interface State {
    store: Store,
    wallet: Wallet
    exchanges: Exchanges
}

const store = new Store()
const wallet = new Wallet()
const exchanges = new Exchanges()

export const Context = createContext<State>({
  store,
  wallet,
    exchanges,
});
spy((ev) => {
  if (ev.type === 'action') {
    console.log(ev);
  }
});
ReactDOM.createRoot(document.getElementById('root')!).render(
 <Context.Provider value={{store, wallet, exchanges}}>
     <App />
 </Context.Provider>
)


