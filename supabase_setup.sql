-- =====================================================
-- COMPLETE SUPABASE DATABASE SETUP
-- Portfolio Nexus System - All Tables & Policies
-- =====================================================

-- =====================================================
-- 1. ACCOUNTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS accounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  account_name TEXT NOT NULL,
  user_id TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id);

-- Enable Row Level Security
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Enable all access for service role" ON accounts;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON accounts;

-- Create policies
CREATE POLICY "Enable all access for service role" ON accounts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users" ON accounts
  FOR SELECT
  TO authenticated
  USING (true);

-- =====================================================
-- 2. USER CONTENT TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS user_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES accounts(user_id) ON DELETE CASCADE,
  content_type TEXT NOT NULL CHECK (content_type IN ('thought', 'repo', 'blog')),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT, -- For repos and blogs
  tags TEXT[], -- For categorization
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_content_user_id ON user_content(user_id);
CREATE INDEX IF NOT EXISTS idx_user_content_type ON user_content(content_type);
CREATE INDEX IF NOT EXISTS idx_user_content_created ON user_content(created_at DESC);

-- Enable Row Level Security
ALTER TABLE user_content ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Enable all access for service role on user_content" ON user_content;
DROP POLICY IF EXISTS "Enable read access for authenticated users on user_content" ON user_content;

-- Create policies
CREATE POLICY "Enable all access for service role on user_content" ON user_content
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users on user_content" ON user_content
  FOR SELECT
  TO authenticated
  USING (true);

-- =====================================================
-- 3. ADMIN LIKES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS admin_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_id UUID NOT NULL REFERENCES user_content(id) ON DELETE CASCADE,
  liked_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  notes TEXT, -- Admin notes about why it's featured
  display_order INTEGER DEFAULT 0, -- For ordering on showcase page
  UNIQUE(content_id) -- One like per content
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_admin_likes_content_id ON admin_likes(content_id);
CREATE INDEX IF NOT EXISTS idx_admin_likes_display_order ON admin_likes(display_order);
CREATE INDEX IF NOT EXISTS idx_admin_likes_liked_at ON admin_likes(liked_at DESC);

-- Enable Row Level Security
ALTER TABLE admin_likes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Enable all access for service role on admin_likes" ON admin_likes;
DROP POLICY IF EXISTS "Enable read access for all on admin_likes" ON admin_likes;

-- Create policies
CREATE POLICY "Enable all access for service role on admin_likes" ON admin_likes
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable read access for all on admin_likes" ON admin_likes
  FOR SELECT
  USING (true);

-- =====================================================
-- 4. SHOWCASED CONTENT VIEW
-- =====================================================

-- Drop view if exists
DROP VIEW IF EXISTS showcased_content;

-- Create view to join content with likes for easy showcase queries
CREATE VIEW showcased_content AS
SELECT 
  uc.id,
  uc.user_id,
  uc.content_type,
  uc.title,
  uc.description,
  uc.url,
  uc.tags,
  uc.created_at,
  uc.updated_at,
  al.liked_at,
  al.notes as admin_notes,
  al.display_order,
  a.account_name
FROM user_content uc
INNER JOIN admin_likes al ON uc.id = al.content_id
INNER JOIN accounts a ON uc.user_id = a.user_id
ORDER BY al.display_order DESC, al.liked_at DESC;

-- Grant permissions on the view
GRANT SELECT ON showcased_content TO authenticated, anon;

-- =====================================================
-- SETUP COMPLETE! 
-- =====================================================
-- Your database is now ready with:
-- ✅ accounts table
-- ✅ user_content table (thoughts, repos, blogs)
-- ✅ admin_likes table (featured content)
-- ✅ showcased_content view (for easy querying)
-- ✅ All indexes for performance
-- ✅ Row Level Security policies
-- =====================================================
