import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { ArticlesComponent } from './features/articles/articles.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  // Separate page
  { path: 'articles', component: ArticlesComponent },

  // fallback
  { path: '**', redirectTo: '' }
];
