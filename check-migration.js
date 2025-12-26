const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase env vars. Set:');
  console.error('  SUPABASE_URL');
  console.error('  SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkMigration() {
  try {
    console.log('Checking if game_id column exists...');

    // Try to select game_id to see if it exists
    const { error } = await supabase
      .from('seo_metadata')
      .select('game_id')
      .limit(1);

    if (error && error.message.includes('game_id')) {
      console.log('game_id column does not exist!');
      console.log('Please apply this migration manually in your Supabase SQL editor:');
      console.log(`
ALTER TABLE seo_metadata
ADD COLUMN game_id UUID REFERENCES games(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_seo_metadata_game_id ON seo_metadata(game_id);

ALTER TABLE seo_metadata
ADD CONSTRAINT unique_seo_metadata_game_id UNIQUE (game_id);
      `);
    } else {
      console.log('game_id column exists - migration already applied');
    }

    console.log('Checking if games.is_popular column exists...');

    const { error: popularError } = await supabase
      .from('games')
      .select('is_popular')
      .limit(1);

    if (popularError && String(popularError.message || '').includes('is_popular')) {
      console.log('games.is_popular column does not exist!');
      console.log('Please apply this migration manually in your Supabase SQL editor:');
      console.log(`
ALTER TABLE games ADD COLUMN IF NOT EXISTS is_popular boolean DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_games_is_popular ON games(is_popular);
      `);
    } else {
      console.log('games.is_popular column exists - migration already applied');
    }
  } catch (error) {
    console.error('Error checking migration:', error);
  }
}

checkMigration();