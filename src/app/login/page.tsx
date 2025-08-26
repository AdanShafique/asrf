
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
    employeeNumber: z.string().min(1, "Employee Number is required."),
    password: z.string().min(1, "Password is required."),
});

export default function LoginPage() {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            employeeNumber: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // NOTE: This is a mock login for demonstration purposes.
        // In a real application, you would validate credentials against a server.
        console.log("Login attempt with:", values);
        
        toast({
            title: "Login Successful",
            description: "Redirecting to your dashboard...",
        });

        // Redirect to dashboard on successful "login"
        router.push("/dashboard");
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <div className="flex justify-center items-center mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Shield className="h-8 w-8" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl">ASRF Tracker</CardTitle>
                    <CardDescription>
                        Please enter your credentials to access the dashboard.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="employeeNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Employee Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., 12345" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                <LogIn className="mr-2 h-4 w-4" />
                                Sign In
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
