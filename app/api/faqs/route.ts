import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_FAQS, type DefaultFaqPage } from '@/lib/default-faqs';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function extractErrorMessage(err: unknown): string {
  if (!err) return 'Unknown error';
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}

function createPublicClient() {
  if (!supabaseUrl) {
    throw new Error('Missing Supabase configuration: SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) not set');
  }

  if (!anonKey) {
    throw new Error(
      'Missing Supabase configuration: SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY) not set'
    );
  }

  return createClient(supabaseUrl, anonKey);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');

  if (!page) {
    return NextResponse.json({ data: [], error: 'Page parameter required' }, { status: 400 });
  }

  const defaultPage = page as DefaultFaqPage;
  const defaultFaqs = DEFAULT_FAQS[defaultPage];
  const defaultData = Array.isArray(defaultFaqs)
    ? defaultFaqs
        .slice()
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((item) => ({
          id: `default-${defaultPage}-${item.sort_order}`,
          page: defaultPage,
          question: item.question,
          answer: item.answer,
          sort_order: item.sort_order,
          active: true,
        }))
    : [];

  try {
    const supabase = createPublicClient();

    const { data, error } = await supabase
      .from('faqs')
      .select('id, page, question, answer, sort_order, active')
      .eq('page', page)
      .eq('active', true)
      .order('sort_order', { ascending: true });

    if (error) throw new Error(extractErrorMessage(error));

    const nextData = Array.isArray(data) ? data : [];
    return NextResponse.json({ data: nextData.length > 0 ? nextData : defaultData });
  } catch (err) {
    console.error('Error fetching public FAQs:', err);
    // Don’t fail the page; prefer defaults when available.
    return NextResponse.json(
      { data: defaultData, error: extractErrorMessage(err) },
      { status: 200 }
    );
  }
}
