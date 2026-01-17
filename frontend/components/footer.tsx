export default function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-center gap-4 text-center md:flex-row md:justify-between">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} HealthCareAI. Built with care for NGOs and communities.
                    </p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                        <a href="#" className="hover:text-primary transition-colors">
                            Privacy
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            Terms
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
