"use client";
import Link from 'next/link';
import * as motion from "framer-motion/client";

interface NarrativeLayoutProps {
  locale: string;
  name: string;
  sidebarLabel?: string;
  image: string;
  title: string;
  mainContent: string;
  sections: { label: string; content: string | null | undefined }[];
  backLink: string;
  backLabel: string;
}

