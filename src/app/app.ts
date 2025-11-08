import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { IOrcamento } from './interfaces/IOrcamento';
import { SupabaseService } from './services/supabase.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  api = inject(SupabaseService);
  protected readonly title = signal('Gerador de Orçamentos - BenCustom');

  constructor() {
    this.api.getOrcamento().then((values: IOrcamento[]) => {
      console.log('Lista de orçamentos: ', values);
    });
  }
}
