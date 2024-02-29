import Script from "next/script";

import { GoogleLogin } from "@react-oauth/google";
import { oAuthConfig } from "@/config/oauth";

const GoogleSignIn = () => {
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          const parsedFormData = new FormData();
          parsedFormData.append(
            "credential",
            credentialResponse.credential ?? ""
          );
          // send as formdata
          fetch(oAuthConfig.redirectUri, {
            method: "POST",
            body: parsedFormData,
          }).then((response) => console.log);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      ;
    </div>
  );
};

export default GoogleSignIn;
