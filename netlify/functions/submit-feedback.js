import { supabase } from './supabaseClient';

export const handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const { error } = await supabase.from('feedback').insert([
      {
        name: data.name,
        email: data.email,
        message: data.message
      }
    ]);

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
