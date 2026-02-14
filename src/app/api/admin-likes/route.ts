import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Get all liked content (for showcase page)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contentId = searchParams.get('contentId');

    if (contentId) {
      // Check if specific content is liked
      const { data, error } = await supabase
        .from('admin_likes')
        .select('*')
        .eq('content_id', contentId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error('Error checking like:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ liked: !!data, like: data });
    }

    // Get all showcased content
    const { data, error } = await supabase
      .from('showcased_content')
      .select('*')
      .order('display_order', { ascending: false })
      .order('liked_at', { ascending: false });

    if (error) {
      console.error('Error fetching showcased content:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ showcased: data });
  } catch (error) {
    console.error('Error in GET /api/admin-likes:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Like content
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contentId, notes, displayOrder } = body;

    if (!contentId) {
      return NextResponse.json({ error: 'contentId is required' }, { status: 400 });
    }

    // Check if content exists
    const { data: content } = await supabase
      .from('user_content')
      .select('id')
      .eq('id', contentId)
      .single();

    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    const { data, error } = await supabase
      .from('admin_likes')
      .insert([
        {
          content_id: contentId,
          notes: notes || null,
          display_order: displayOrder || 0,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error liking content:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ like: data }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin-likes:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Update like (e.g., change display order or notes)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { contentId, notes, displayOrder } = body;

    if (!contentId) {
      return NextResponse.json({ error: 'contentId is required' }, { status: 400 });
    }

    const updateData: any = {};
    if (notes !== undefined) updateData.notes = notes;
    if (displayOrder !== undefined) updateData.display_order = displayOrder;

    const { data, error } = await supabase
      .from('admin_likes')
      .update(updateData)
      .eq('content_id', contentId)
      .select()
      .single();

    if (error) {
      console.error('Error updating like:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ like: data });
  } catch (error) {
    console.error('Error in PUT /api/admin-likes:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Unlike content
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contentId = searchParams.get('contentId');

    if (!contentId) {
      return NextResponse.json({ error: 'contentId is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('admin_likes')
      .delete()
      .eq('content_id', contentId);

    if (error) {
      console.error('Error unliking content:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Content unliked successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/admin-likes:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
