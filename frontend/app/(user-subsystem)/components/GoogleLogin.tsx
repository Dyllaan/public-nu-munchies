import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { oAuthConfig } from "@/config/oauth";
import useUserSubsystem from "../../../hooks/user-subsystem/use-user-subsystem";
import { toast } from "sonner";

const GoogleSignIn = () => {
  const { oAuthLogin } = useUserSubsystem();

  const handleLogin = async (credentialResponse: CredentialResponse) => {
    const parsedFormData = new FormData();
    parsedFormData.append("credential", credentialResponse.credential ?? "");
    oAuthLogin(oAuthConfig.redirectUri, parsedFormData).catch((err) =>
      toast.error(JSON.stringify(err))
    );
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleLogin}
        onError={() => {
          toast.error("Google login failed");
        }}
      />
    </div>
  );
};

export default GoogleSignIn;
