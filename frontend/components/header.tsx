import Link from "next/link";
import { Heart } from "lucide-react";

export default function Header() {
    return (
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <Heart className="h-6 w-6 text-accent" />
                    <span className="text-xl font-semibold text-foreground">
                        HealthCare<span className="text-accent">AI</span>
                    </span>
                </Link>

                <nav className="flex items-center gap-6">
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
            </div>
        </header>
    );
}
