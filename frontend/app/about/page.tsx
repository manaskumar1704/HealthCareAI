"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <div className="container mx-auto max-w-3xl px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <h1 className="mb-6 text-3xl font-bold text-foreground sm:text-4xl">About HealthCareAI</h1>

                <div className="prose prose-zinc dark:prose-invert max-w-none">
                    <p className="text-lg text-muted-foreground">
                        HealthCareAI is an open-source initiative designed to bridge the gap between
                        healthcare providers, NGOs, and the communities they serve.
                    </p>

                    <h2 className="mt-8 text-2xl font-semibold">Our Mission</h2>
                    <p className="mt-4 text-muted-foreground">
                        To provide a simple, accessible, and trustworthy platform that empowers
                        communities to support each other during health crises and daily challenges.
                    </p>

                    <h2 className="mt-8 text-2xl font-semibold">How It Works</h2>
                    <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
                        <li>Patients or those in need can easily request support.</li>
                        <li>Verified volunteers are matched with requests in their area.</li>
                        <li>NGOs oversee the process to ensure safety and quality of care.</li>
                    </ul>
                </div>
            </motion.div>
        </div>
    );
}
