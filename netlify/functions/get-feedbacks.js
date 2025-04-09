import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const dataPath = join(process.cwd(), 'netlify', 'functions', 'feedback-data.json')

export const handler = async () => {
  try {
    if (!existsSync(dataPath)) {
      return {
        statusCode: 200,
        body: JSON.stringify([])
      }
    }

    const data = readFileSync(dataPath, 'utf8')
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: data
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}