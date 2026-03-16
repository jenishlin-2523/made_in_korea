-- Database setup for Movie Show Response Tracking

CREATE TABLE responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_name TEXT NOT NULL,
    movie_name TEXT NOT NULL DEFAULT 'Made In Korea',
    response TEXT CHECK (response IN ('YES', 'NO')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security (RLS)
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON responses
    FOR INSERT WITH CHECK (true);

-- Allow public anonymous selects for admin (simplified for this task)
-- In a real app, you'd restrict this to authenticated admins.
CREATE POLICY "Allow public select" ON responses
    FOR SELECT USING (true);
