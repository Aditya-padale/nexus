import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ accounts: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accountName, userId } = body;

    if (!accountName || !userId) {
      return NextResponse.json(
        { error: 'Account name and user ID are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('accounts')
      .insert([
        {
          account_name: accountName,
          user_id: userId,
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json({ account: data[0] }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Account ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('accounts')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ message: 'Account deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
