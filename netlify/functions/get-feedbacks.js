import { supabase } from './supabaseClient';

export const handler = async () => {
  try {
    const { data, error } = await supabase.from('feedback').select('*').order('created_at', { ascending: false });

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
