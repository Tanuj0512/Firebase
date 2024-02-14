import { auth, provider } from "../firbase/firebase";
import { signInWithPopup } from "firebase/auth";
import "./auth.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="auth">
      <p> Sign In With Google To Continue </p>
      <button onClick={signInWithGoogle}> Sign In With Google </button>
    </div>
  );
};




// import React from "react";
// import { auth, provider } from "../firbase/firebase";
// import { signInWithPopup } from "firebase/auth";
// import Cookies from "universal-cookie";
// import "./auth.css";

// const cookies = new Cookies();
// export const Auth = (props) => {
//   const { setIsAuth } = props;
//   const signInWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       cookies.set("auth-token", result.user.refreshToken);
//       setIsAuth(true);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="auth">
//       <p>Sign in with Google</p>
//       <button onClick={signInWithGoogle}> Sign In With Google</button>
//     </div>
//   );
// };
