"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function PatientPage() {
    return (
        <div className="container mx-auto max-w-2xl px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <h1 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
                    Request Support
                </h1>
                <p className="mb-8 text-lg text-muted-foreground">
                    Fill out this simple form to connect with a verified volunteer. Your privacy is our priority.
                </p>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        toast.success("Request sent successfully", {
                            description: "Our dedicated team will contact you shortly.",
                        });
                        (e.target as HTMLFormElement).reset();
                    }}
                    className="space-y-6"
                >
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="firstName" className="text-sm font-medium">
                                First Name
                            </label>
                            <Input id="firstName" placeholder="Jane" required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="lastName" className="text-sm font-medium">
                                Last Name
                            </label>
                            <Input id="lastName" placeholder="Doe" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                            Phone Number
                        </label>
                        <Input id="phone" type="tel" placeholder="(555) 123-4567" required />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="needs" className="text-sm font-medium">
                            What kind of support do you need?
                        </label>
                        <Textarea
                            id="needs"
                            placeholder="E.g., Transportation to appointment, grocery delivery, friendly check-in..."
                            className="min-h-[120px]"
                            required
                        />
                    </div>

                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                        Submit Request <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        <span>Secure & Confidential</span>
                    </p>
                </form>
            </motion.div>
        </div>
    );
}
