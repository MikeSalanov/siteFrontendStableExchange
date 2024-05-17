import { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Store from './store/store.ts'
import Wallet from './store/wallet.ts'


interface State {
    store: Store,
    wallet: Wallet
}

const store = new Store()
const wallet = new Wallet()

export const Context = createContext<State>({
    store,
    wallet
})

ReactDOM.createRoot(document.getElementById('root')!).render(
 <Context.Provider value={{store, wallet}}>
     <App />
 </Context.Provider>
)


