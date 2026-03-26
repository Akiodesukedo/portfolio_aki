import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext"
import { usePageTransition } from "../context/PageTransitionContext";
import CtaBtn from "../atoms/CtaBtn";

const Login: React.FC = () => {
  const { loginWithGoogle, logout } = useAuth();
  const { triggerTransition } = usePageTransition();

  return (
    <div className="h-[100vh] flex flex-col items-center justify-center gap-[24px]">
      <h1 className="text-3xl font-bold">Login Page</h1>

      <GoogleLogin 
        onSuccess={async(credentialResponse) => {
          if (!credentialResponse.credential) return;

          const result = await loginWithGoogle(credentialResponse.credential);

          if (result?.isAdmin) {
            triggerTransition('/post-new-content')
          } else {
            triggerTransition('/')
          }            
        }}
        onError={() => {
          console.log("Login failed")
        }}
      />

      <CtaBtn 
        btnMsg="Log out"
        className="hover:bg-black hover:text-white disabled:opacity-50 disabled:bg-black disabled:text-white"
        width="w-[500px]"
        passedFunc={() => logout()}
      />
    </div>
  )
}

export default Login