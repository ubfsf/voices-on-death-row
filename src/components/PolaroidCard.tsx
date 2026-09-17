'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

interface PolaroidCardProps {
  href?: string;
  src: string;
  alt: string;
  name: string;
  caseId?: string;
  date?: string;
  location?: string;
  rotate?: number;
  children?: ReactNode;
  className?: string;
}

export default function PolaroidCard({
  href,
  src,
  alt,
  name,
  caseId,
  date,
  location,
  rotate = 0,
  children,
  className = '',
}: PolaroidCardProps) {
  const CardInner = (
    <div
      className={`relative w-full ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="polaroid-card">
        <div className="masking-tape" />
        <div className="photo-wrapper">
          {src ? (
            <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 80vw, 320px" priority={false} unoptimized />
          ) : (
            <div className="w-full h-full bg-[#f5f5f5]" />
          )}
        </div>
        <div className="polaroid-chin">
          <h3 className="inmate-name">{name}</h3>
          {(caseId || date || location) && (
            <div className="meta-row">
              {caseId && <span>CASE: {caseId}</span>}
              {date && <span>DATE: {date}</span>}
              {location && <span>LOC: {location}</span>}
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .polaroid-card {
          background: #fff;
          padding: 16px 16px 64px 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.25);
          position: relative;
          transform: translateZ(0);
        }
        .masking-tape {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%) rotate(-3deg);
          width: 90px;
          height: 28px;
          background: rgba(220,210,190,0.9);
          box-shadow: 0 1px 3px rgba(0,0,0,0.12);
          border-radius: 2px;
        }
        .photo-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 1/1;
          overflow: hidden;
          background: #f5f5f5;
        }
        .polaroid-chin {
          margin-top: 16px;
          text-align: center;
          color: #111;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
        }
        .inmate-name {
          font-weight: 700;
          font-size: 1.125rem;
          line-height: 1.2;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }
        .meta-row {
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #555;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1rem;
          justify-content: center;
          font-variant-numeric: tabular-nums;
        }
        @media (max-width: 640px) {
          .polaroid-card {
            padding: 12px 12px 56px 12px;
          }
          .inmate-name {
            font-size: 1rem;
          }
        }
      `}</style>
      {children}
    </div>
  );

  if (href) {
    return <Link href={href}>{CardInner}</Link>;
  }
  return CardInner;
}
