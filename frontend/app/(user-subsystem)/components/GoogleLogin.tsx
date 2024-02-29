import Script from 'next/script';

const GoogleSignIn = () => {

  return (
    <div>
      <Script 
        src="https://accounts.google.com/gsi/client" 
        strategy="lazyOnload"
        async
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
