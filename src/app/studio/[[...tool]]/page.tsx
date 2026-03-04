"use client";

import { NextStudio } from 'next-sanity/studio';
// This uses the new 'root' alias to find the config file instantly
import config from '../../../../sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
