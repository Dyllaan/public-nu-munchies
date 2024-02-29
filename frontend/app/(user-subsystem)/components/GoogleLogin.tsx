<<<<<<< Updated upstream
import Script from 'next/script';

const GoogleSignIn = () => {

  return (
    <div>
      <Script 
        src="https://accounts.google.com/gsi/client" 
        strategy="lazyOnload"
        async
=======
import { GoogleLogin } from "@react-oauth/google";
import { oAuthConfig } from "@/config/oauth";
import { useUserSubsystem } from "../../../hooks/user-subsystem/use-user-subsystem";
import { toast } from "sonner";


const GoogleSignIn = () => {

  const { oAuthLogin } = useUserSubsystem();

  const handleLogin = async(data: any) => {
    const { email, password } = data;

    const response = await oAuthLogin(email, password);
    if (response) {
        toast.error(response);
    }
};

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
          /* send as formdata
          fetch(oAuthConfig.redirectUri, {
            method: "POST",
            body: parsedFormData,
          }).then((response) => console.log);*/
          oAuthLogin(oAuthConfig.redirectUri, parsedFormData);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
>>>>>>> Stashed changes
      />
      <button>Google Sign In</button>
      <div id="g_id_onload"
        data-client_id="1063028006737-bf6rpohsbau9qaqijibvmg8p6sfhn9ch.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-login_uri="http://localhost:8080/oauthcallback"
        data-auto_prompt="false">
      </div>

      <div className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left">
      </div>
    </div>
  );
};

export default GoogleSignIn;
