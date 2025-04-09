import { writeFileSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'

const dataPath = join(process.cwd(), 'netlify', 'functions', 'feedback-data.json')

export const handler = async (event) => {
  try {
    if (!existsSync(dataPath)) {
      writeFileSync(dataPath, '[]', 'utf8')
    }

    const newData = JSON.parse(event.body)
    const allData = JSON.parse(readFileSync(dataPath, 'utf8'))
    
    allData.push({
      id: Date.now(),
      ...newData,
      timestamp: new Date().toISOString()
    })

    writeFileSync(dataPath, JSON.stringify(allData, null, 2), 'utf8')
    
    return {
      statusCode: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      },
      body: JSON.stringify({ success: true, path: dataPath })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}