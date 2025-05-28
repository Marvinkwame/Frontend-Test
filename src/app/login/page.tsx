"use client"
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Spinner = () => (
  <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
);

const LoginPage = () => {
  const { login, user, isLoading } = useAuth();
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@memo.com",
      password: "admin@memo.com",
    },
  });

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error("Login failed:", error);
      // You can show an error message to the user here
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white w-96 rounded-[8px] p-8">
        <h2 className="text-center text-2xl font-semibold">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-y-4">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="email">Email</label>
            <input
              {...register("email")}
              type="email"
              className="bg-gray-300 py-2 px-3 rounded-[5px]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="password">Password</label>
            <input
              {...register("password")}
              type="password"
              className="bg-gray-300 py-2 px-3 rounded-[5px]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 rounded-[6px] py-2 px-4 text-white font-medium hover:bg-blue-800 transition-all"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "SIGN IN"}
          </button>
        </form>
        <div className="text-center mt-8">
          <h3>
            Forgot <span className="text-blue-600">Username/Password</span>
          </h3>
          <p>
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-blue-600">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;