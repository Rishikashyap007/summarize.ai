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
import { Checkbox } from "@/components/ui/checkbox";
import { Navbar } from "@/components/navbar";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterCard() {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      //   confirmPassword: "",
      agreeTerms: false,
    },
  });
  const router = useRouter();
  const onSubmit = async(values) => {
    // console.log(values);
    // alert("Registered Successfully!");
    try {
      const res = await axios.post(`/api/auth/register`, values);
      if (res.data) {
        alert("Registered Successfully!");
        router.push("/login");
      }
    } catch (error) {
      console.log(error,"error while register");
    }
  };

  return (
    <>
    <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md bg-card text-card-foreground rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-foreground">
            Create Account
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>FullName </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="abc..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

              {/* Confirm Password */}
              {/* <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="••••••••" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

              {/* Agree Terms */}
              <FormField
                control={form.control}
                name="agreeTerms"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox {...field} />
                    </FormControl>
                    <FormLabel className="text-sm text-foreground">
                      I agree to the Terms and Conditions
                    </FormLabel>
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button type="submit" className="w-full mt-2">
                Register
              </Button>
            </form>
          </Form>

          <p className="text-sm text-muted-foreground mt-4 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-primary underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
