import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext"
import { usePageTransition } from "../context/PageTransitionContext";

const Login: React.FC = () => {
  const { loginWithGoogle, isAdmin } = useAuth();
  const { triggerTransition } = usePageTransition();

  return (
    <div className="h-[100vh] flex flex-col items-center justify-center gap-[24px]">
      <h1 className="text-3xl font-bold">Login Page</h1>

      <GoogleLogin 
        onSuccess={async(credentialResponse) => {
          if (!credentialResponse.credential) return;

          await loginWithGoogle(credentialResponse.credential);

          setTimeout(() => {
            if (isAdmin) {
              triggerTransition('/post-new-content')
            } else {
              triggerTransition('/')
            }            
          }, 100)
        }}
        onError={() => {
          console.log("Login failed")
        }}
      />
    </div>
  )
}

export default Login