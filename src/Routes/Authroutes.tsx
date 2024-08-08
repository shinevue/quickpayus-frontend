import { Route, Routes } from "react-router-dom";
import SignIn from "@/components/UserComponents/Auth/SignIn";
import SignupForm from "@/components/UserComponents/Auth/Signup";
import ForgotPassword from "@/components/UserComponents/Auth/ForgotPassword";

const AuthRoutes = () => {
   return (
      <Routes>
         <Route path="/signin" element={<SignIn />} />
         <Route path="/signup" element={<SignupForm />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
   );
};

export default AuthRoutes;
