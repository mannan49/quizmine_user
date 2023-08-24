import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../store/userSlice";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
