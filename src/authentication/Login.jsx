import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 🔐 Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!email) return setError("E-mail is required");
      if (!password) return setError("Password is required");

      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      if (result?.success) {
        toast.success("Login successful");
        navigate("/dashboard");
      } else {
        toast.error("Somthing went wrong");
      }
    } catch (err) {
      console.error(err);
      setError("login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40">
      <Card className="w-full max-w-sm shadow-lg rounded">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login Form</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded focus-visible:ring-2 focus-visible:ring-blue-500 py-5"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded focus-visible:ring-2 focus-visible:ring-blue-500 py-5"
              />
            </div>

            {/* Error */}
            {error && <p className="text-sm text-red-500">{error}</p>}

            {/* Login Button */}
            <Button
              variant="outline"
              type="submit"
              className="w-full h-10 text-lg cursor-pointer bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
            >
              Login
            </Button>
          </form>

          {/* Divider */}
          <div className="my-4 text-center text-sm text-gray-500">OR</div>

          {/* Google Login */}
          <Button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border hover:bg-gray-900 cursor-pointer h-10"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.6 16 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.6 4 24 4c-7.3 0-13.6 4.1-17.7 10.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.3 0 10.2-2 13.8-5.2l-6.4-5.3C29.4 35.7 26.9 36 24 36c-5.4 0-9.7-3.3-11.3-8l-6.6 5.1C9.9 40.2 16.4 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-1 2.7-3.2 5-6.1 6.3l6.4 5.3C38.9 36.7 44 31 44 24c0-1.3-.1-2.7-.4-3.5z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Signup */}
          <p
            onClick={() => navigate("/signup")}
            className="text-sm text-center mt-4 cursor-pointer text-blue-500 hover:underline"
          >
            Don’t have an account? Signup
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
