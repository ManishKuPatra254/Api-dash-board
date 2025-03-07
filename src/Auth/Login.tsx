import { RiContrast2Line } from "@remixicon/react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { loginUser } from "../Services/auth.service";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "../components/Toaster";
import { useToast } from "../lib/useToast";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted", formData);

    try {
      const response = await loginUser(formData);
      if (response && response.success === true) {
        toast({
          title: "Success",
          description: "Successfully logged in!",
          variant: "success",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Error",
          description: "Invalid credentials. Please try again.",
          variant: "error",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Login failed",
        variant: "error",
      });
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-28 lg:px-6">
        <div className="relative sm:mx-auto sm:w-full sm:max-w-sm">
          <div
            className="pointer-events-none absolute -top-[25%] left-1/2 -translate-x-1/2 select-none opacity-60 dark:opacity-90"
            aria-hidden="true"
            style={{
              maskImage:
                "radial-gradient(rgba(0, 0, 0, 1) 0%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(rgba(0, 0, 0, 1) 0%, transparent 80%)",
            }}
          >
            <div className="flex flex-col gap-1">
              {Array.from({ length: 10 }, (_, index) => (
                <div key={`outer-${index}`}>
                  <div className="flex gap-2">
                    {Array.from({ length: 10 }, (_, index2) => (
                      <div key={`inner-${index}-${index2}`}>
                        <div className="size-7 rounded-md shadow shadow-indigo-500/40 ring-1 ring-black/5 dark:shadow-indigo-400/20 dark:ring-white/10" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-fit rounded-xl bg-gray-50 p-4 shadow-md shadow-black/10 ring-1 ring-black/10 dark:bg-gray-900 dark:ring-gray-800">
            <div className="absolute left-[9%] top-[9%] size-1 rounded-full bg-gray-100 shadow-inner dark:bg-gray-800" />
            <div className="absolute right-[9%] top-[9%] size-1 rounded-full bg-gray-100 shadow-inner dark:bg-gray-800" />
            <div className="absolute bottom-[9%] left-[9%] size-1 rounded-full bg-gray-100 shadow-inner dark:bg-gray-800" />
            <div className="absolute bottom-[9%] right-[9%] size-1 rounded-full bg-gray-100 shadow-inner dark:bg-gray-800" />
            <div className="w-fit rounded-lg bg-gradient-to-b from-blue-400 to-blue-600 p-3 shadow-sm shadow-blue-500/50 ring-1 ring-inset ring-white/25">
              <RiContrast2Line
                className="size-8 text-white"
                aria-hidden="true"
              />
            </div>
          </div>
          <h2 className="mt-4 text-center text-sm font-semibold text-gray-900 dark:text-gray-50">
            KAIE{" "}
          </h2>
          <h2 className="mt-2 text-center text-lg font-semibold text-gray-900/50 dark:text-gray-50">
            Sign in to Overview
          </h2>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <Label className="block text-sm font-medium">Email address</Label>
              <div className="mt-1">
                <Input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full text-xs [&::placeholder]:text-gray-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>

            <div className="mt-2">
              <Button
                type="submit"
                variant="secondary"
                className="mt-6 w-full bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm 
          transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
