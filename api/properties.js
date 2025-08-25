// File: src/api/properties.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(request, response) {
  try {
    // Recupera le proprietà dal database
    const {  properties, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    
    if (error) {
      throw error;
    }
    
    response.status(200).json({
      properties: properties,
      total_count: properties.length,
      last_updated: new Date().toISOString()
    });
  } catch (error) {
    console.error("Errore nel caricamento delle proprietà:", error);
    response.status(500).json({ 
      error: "Errore nel caricamento delle proprietà",
      properties: [],
      total_count: 0
    });
  }
}