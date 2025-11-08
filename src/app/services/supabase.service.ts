import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { IOrcamento } from '../interfaces/IOrcamento';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    if (!(window as any)._supabaseClient) {
      (window as any)._supabaseClient = createClient(
        environment.supabaseUrl,
        environment.supabaseKey,
        {
          auth: {
            persistSession: true,
            autoRefreshToken: false,
            detectSessionInUrl: false,
            storage: localStorage,
          },
        }
      );
    }

    this.supabase = (window as any)._supabaseClient;
  }

  /**
   * Retorna todos os orçamentos, ordenados por criação
   */
  async getOrcamento(): Promise<IOrcamento[]> {
    const { data, error } = await this.supabase
      .from('orcamento')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as IOrcamento[];
  }
}
