import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext"
import { usePageTransition } from "../context/PageTransitionContext";

const Login: React.FC = () => {
  const { loginWithGoogle, isAdmin, logout } = useAuth();
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

      <button
        onClick={() => logout()}
      >
        Logout
      </button>
    </div>
  )
}

export default Login