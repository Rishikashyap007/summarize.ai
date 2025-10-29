"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginCard() {
  const [loading,setLoading] = useState(false)
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter()
  

  const onSubmit = async (values) => {
    // console.log(values);
    // alert("Logged in Successfully!");
    setLoading(true)
    try {
      const res = await axios.post(`/api/auth/login`, values);
      // console.log(res.data.success,"Lohin")
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        console.log(res, "response while login");
        alert("Login successfull")
        router.push('/dashboard')
      }
    } catch (error) {
      console.log(error, "Error while login");
      alert("Error while Login")
    }finally{
      setLoading(false)
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md bg-card text-card-foreground rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-foreground">
            Login
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="you@example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="••••••••"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full mt-2">
               {loading? "loading..." :"Login"}
              </Button>
            </form>
          </Form>

          <p className="text-sm text-muted-foreground mt-4 text-center">
            Don’t have an account?{" "}
            <a href="/register" className="text-primary underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
