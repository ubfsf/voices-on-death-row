// src/app/api/visual-menu/route.ts
import { NextResponse } from 'next/server';
import { getVisualMenu } from '@/lib/sanityQueries';
import { getClientIp, rateLimit, tooManyRequests } from '@/lib/utils';

export async function GET(req: Request) {
  const limit = rateLimit(`visual-menu:${getClientIp(req)}`, { windowMs: 60_000, max: 120 });
  if (!limit.allowed) return tooManyRequests(limit);

  try {
    const { searchParams } = new URL(req.url);
    const locale = searchParams.get('locale') || 'en';

    const data = await getVisualMenu(locale);
    
    // Only return extra items from CMS (defaults are in component)
    if (!data || !data.menuItems || data.menuItems.length === 0) {
      return NextResponse.json({
        menuItems: [],
        usingCMS: false
      });
    }

    return NextResponse.json({
      menuItems: data.menuItems,
      usingCMS: true
    });

  } catch (error) {
    console.error('Error fetching visual menu:', error);
    return NextResponse.json({
      menuItems: [],
      usingCMS: false,
      error: 'CMS unavailable'
    });
  }
}