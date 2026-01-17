# HealthCareAI Development Guide

A lightweight healthcare support web application built for NGOs and communities.

## Overview

This project connects patients seeking healthcare support with compassionate volunteers. Built with simplicity, trust, and accessibility as core values.

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Runtime**: Bun
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend
- **Framework**: FastAPI
- **Runtime**: Python 3.12+
- **Package Manager**: uv
- **Database**: Supabase (PostgreSQL) - *to be configured*

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) installed
- [uv](https://github.com/astral-sh/uv) installed
- Python 3.12+

### Frontend Setup

```bash
cd frontend
bun install
bun run dev
```

Frontend will be available at `http://localhost:3000`

### Backend Setup

```bash
cd backend
uv sync
uv run uvicorn main:app --reload
```

Backend API will be available at `http://localhost:8000`

## Development

### Lint
```bash
cd frontend
bun run lint
```

### Build
```bash
cd frontend
bun run build
```

### Type Check
```bash
cd frontend
bun run type-check
```

## Project Structure

```
HealthCareAI/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with header/footer
│   │   ├── page.tsx         # Homepage
│   │   └── globals.css      # Tailwind config & theme
│   ├── components/
│   │   ├── header.tsx       # Navigation header
│   │   └── footer.tsx       # Footer component
│   └── lib/
│       └── utils.ts         # Utilities
├── backend/
│   └── main.py              # FastAPI entry point
├── AGENTS.md                # Agent development guidelines
└── DESIGN.md                # UI/UX design principles
```

## Design Principles

See [DESIGN.md](DESIGN.md) for complete guidelines.

**Key Values:**
- Clean and reassuring experience
- Minimal cognitive load
- Mobile-first, accessible
- Blue for trust, Green for health

**Core Principles:**
- Simplicity over sophistication
- Healthcare data handled carefully
- Forms should be short, clear, mobile-friendly
- No unnecessary abstractions

## License

Built for NGO evaluation purposes. Handle healthcare data responsibly.
