"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <Heart className="h-6 w-6 text-accent" />
                    <span className="text-xl font-semibold text-foreground">
                        HealthCare<span className="text-accent">AI</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        href="/patient"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        For Patients
                    </Link>
                    <Link
                        href="/volunteer"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        For Volunteers
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        About Us
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </Button>
            </div>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden border-b border-border bg-background md:hidden"
                    >
                        <nav className="container flex flex-col gap-4 p-4">
                            <Link
                                href="/patient"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                For Patients
                            </Link>
                            <Link
                                href="/volunteer"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                For Volunteers
                            </Link>
                            <Link
                                href="/about"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About Us
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
