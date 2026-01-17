"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Heart, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function VolunteerPage() {
    return (
        <div className="container mx-auto max-w-2xl px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                        <Heart className="h-6 w-6 text-accent" />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                        Join as a Volunteer
                    </h1>
                </div>

                <p className="mb-8 text-lg text-muted-foreground">
                    Make a difference in your community. Help neighbors access healthcare and support.
                </p>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        toast.success("Application received", {
                            description: "We'll be in touch shortly to complete your verification.",
                        });
                        (e.target as HTMLFormElement).reset();
                    }}
                    className="space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm md:p-8"
                >
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email Address
                        </label>
                        <Input id="email" type="email" placeholder="you@example.com" required />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium">
                            Create Password
                        </label>
                        <Input id="password" type="password" required />
                    </div>

                    <div className="rounded-lg bg-muted/50 p-4">
                        <h3 className="mb-2 flex items-center gap-2 font-semibold">
                            <ShieldCheck className="h-4 w-4 text-primary" />
                            Verification Required
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            To ensure safety, all volunteers must undergo a basic background check.
                        </p>
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                        Create Account
                    </Button>
                </form>
            </motion.div>
        </div>
    );
}
