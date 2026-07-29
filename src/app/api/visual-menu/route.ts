// src/app/api/visual-menu/route.ts
import { NextResponse } from 'next/server';
import { getVisualMenu } from '@/lib/sanityQueries';

export async function GET(req: Request) {
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