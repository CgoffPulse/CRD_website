"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "../actions/events";

interface LoginState {
  success?: boolean;
  error?: string;
}

// React 19 pattern: useFormStatus in child component
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full cursor-pointer" disabled={pending} type="submit">
      {pending ? "Logging in..." : "Login"}
    </Button>
  );
}

export function LoginForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState<LoginState, FormData>(
    loginAction,
    {}
  );

  useEffect(() => {
    if (state?.success) {
      router.refresh();
    }
  }, [state, router]);

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Admin Login</CardTitle>
        <CardDescription>Enter your password to access the CMS</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4" ref={formRef}>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              className="bg-background text-foreground"
              id="password"
              name="password"
              placeholder="Enter password"
              required
              type="password"
            />
          </div>
          {state?.error && (
            <p className="font-medium text-destructive text-sm">
              {state.error}
            </p>
          )}
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
