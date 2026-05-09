import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!email) {
        setError("E-mail is required");
        return;
      }
      if (!password) {
        setError("Password is required");
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);

      toast.success("Signup Successfully");

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40">
      <Card className="w-full max-w-sm shadow-lg rounded">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Signup Form</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label>E-mail</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded focus-visible:ring-2 focus-visible:ring-blue-500 py-5"
              />
            </div>

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

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex justify-center items-center">
              <Button
                variant="outline"
                type="submit"
                className="rounded cursor-pointer h-10 w-25 text-lg"
              >
                Sign Up
              </Button>
            </div>
          </form>

          <p
            onClick={() => navigate("/")}
            className="text-sm text-center mt-4 cursor-pointer text-blue-500 hover:underline"
          >
            Already have an account? Login
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
