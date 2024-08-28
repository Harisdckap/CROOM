import { Link, Navigate, Outlet, useParams } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import { MyContextProvider } from "../context/AppContext.jsx";

export default function DefaultLayout() {
  const { auth, setAuth } = useStateContext();
  const param = useParams();

  if (!auth) {
    return <Navigate to="/login" />;
  } 
  else {
    return (
      <MyContextProvider>
            <Outlet />
      </MyContextProvider>
    );
  }
}
