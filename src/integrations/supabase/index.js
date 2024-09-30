// Import all the relevant exports from other files in the supabase directory
import { supabase } from './supabase.js';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth.jsx';
import {
  useForeignPopulationStat,
  useForeignPopulationStats,
  useAddForeignPopulationStat,
  useUpdateForeignPopulationStat,
  useDeleteForeignPopulationStat
} from './hooks/foreign_population_stats.js';

// Export all the imported functions and objects
export {
  supabase,
  SupabaseAuthProvider,
  useSupabaseAuth,
  SupabaseAuthUI,
  useForeignPopulationStat,
  useForeignPopulationStats,
  useAddForeignPopulationStat,
  useUpdateForeignPopulationStat,
  useDeleteForeignPopulationStat
};