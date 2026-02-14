import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const contentId = searchParams.get('contentId');
    const contentType = searchParams.get('contentType');

    let query = supabase.from('user_content').select('*');

    if (userId) {
      query = query.eq('user_id', userId);
    }
    if (contentId) {
      query = query.eq('id', contentId);
    }
    if (contentType) {
      query = query.eq('content_type', contentType);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching content:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ content: data });
  } catch (error) {
    console.error('Error in GET /api/user-content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, contentType, title, description, url, tags } = body;

    // Validate required fields
    if (!userId || !contentType || !title) {
      return NextResponse.json(
        { error: 'userId, contentType, and title are required' },
        { status: 400 }
      );
    }

    // Validate content type
    if (!['thought', 'repo', 'blog'].includes(contentType)) {
      return NextResponse.json(
        { error: 'contentType must be thought, repo, or blog' },
        { status: 400 }
      );
    }

    // Verify user exists
    const { data: user } = await supabase
      .from('accounts')
      .select('user_id')
      .eq('user_id', userId)
      .single();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { data, error } = await supabase
      .from('user_content')
      .insert([
        {
          user_id: userId,
          content_type: contentType,
          title,
          description: description || null,
          url: url || null,
          tags: tags || [],
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating content:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ content: data }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/user-content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, description, url, tags } = body;

    if (!id) {
      return NextResponse.json({ error: 'Content ID is required' }, { status: 400 });
    }

    const updateData: any = { updated_at: new Date().toISOString() };
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (url !== undefined) updateData.url = url;
    if (tags !== undefined) updateData.tags = tags;

    const { data, error } = await supabase
      .from('user_content')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating content:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ content: data });
  } catch (error) {
    console.error('Error in PUT /api/user-content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Content ID is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('user_content')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting content:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Content deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/user-content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
