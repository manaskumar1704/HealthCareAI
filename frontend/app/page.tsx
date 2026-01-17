"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Users, ClipboardList, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Supporting Health,{" "}
              <span className="text-accent">Together</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Connect with compassionate volunteers and access healthcare support
              when you need it most. Simple, trustworthy, and built for communities.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/patient"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                I Need Support
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/volunteer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent/10 hover:text-accent"
              >
                I Want to Help
                <Heart className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="border-t border-border bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10">
                  <ClipboardList className="h-7 w-7 text-accent" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Simple Forms</h3>
                <p className="text-sm text-muted-foreground">
                  Quick and easy registration. No complicated steps or confusing jargon.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Community Support</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with volunteers dedicated to helping their neighbors.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10">
                  <Heart className="h-7 w-7 text-accent" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Care First</h3>
                <p className="text-sm text-muted-foreground">
                  Your privacy and wellbeing are our top priorities.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

