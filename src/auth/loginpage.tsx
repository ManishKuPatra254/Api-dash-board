import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import loginapi from "../assets/28772962_7461489.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import { useState } from "react";
import { loginUser } from "@/Services/auth.service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface FormData {
  email: string;
  password: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log("Form submitted", formData);
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const response = await loginUser(formData);
      if (response && response.success === true) {
        toast.success("Successfully logged in!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleLoginSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-xs mt-2 text-muted-foreground">
                  Login to your KAIE account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-xs">
                  Email
                </Label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleLoginChange}
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="text-xs placeholder:text-xs"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-xs">
                    Password
                  </Label>
                  <Link
                    to="#"
                    className="ml-auto text-xs underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleLoginChange}
                  placeholder="Enter your password"
                  required
                  className="text-xs placeholder:text-xs"
                />
              </div>
              <Button type="submit" className="w-full mt-3" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              <div className="text-center text-xs">
                Don&apos;t have an account?{" "}
                <Link to="#" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src={loginapi}
              alt="Image"
              className="absolute h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
