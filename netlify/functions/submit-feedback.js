import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

export const handler = async (event) => {
  try {
    const { name, email, message } = JSON.parse(event.body)
    
    const { data, error } = await supabase
      .from('feedbacks')
      .insert([{ name, email, message }])
      .select()

    if (error) throw error

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data[0])
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}