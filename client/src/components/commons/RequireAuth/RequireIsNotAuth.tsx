import { Navigate} from "react-router-dom";
import { Context } from "../../../main";
import { useContext } from "react";


function RequireIsNotAuth({ children }:{children:JSX.Element}):JSX.Element {

  const {store} = useContext(Context);
  
  
  if (store.isAuth) {
    return <Navigate to="/"/>;
  }

  return children;
}

export default RequireIsNotAuth