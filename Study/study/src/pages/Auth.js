import "./Auth.css";
import { auth, provider } from "../components/firebase";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import {motion } from "framer-motion";
const cookies = new Cookies();


export const Auth = (props) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken); // saves cookie even after the page refreshes
      props.setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div className="ath">
    <p>Sign In With Google to continue</p>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </motion.div>
  );
};
