import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// redux
import { selectProfile } from "@/app/selectors";

const useIsSignin = (): boolean => {
  const [isSignin, setIsSignIn] = useState<boolean>(false);

  const profile = useSelector(selectProfile);

  useEffect(() => {
    setIsSignIn(!!profile.username);
  }, [profile]);

  return isSignin;
};

export default useIsSignin;
