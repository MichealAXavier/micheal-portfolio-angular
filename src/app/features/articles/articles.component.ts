import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../models/article.model';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articles: Article[] = [];
  filteredArticles: Article[] = [];

  searchText = '';
  selectedTag = '';

  page = 1;
  pageSize = 6;
  showTags = false;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(data => {
      this.articles = data;
      this.filteredArticles = data;
    });
  }

  filterArticles(): void {
    this.page = 1; // ✅ reset page

    this.filteredArticles = this.articles.filter(a =>
      a.title.toLowerCase().includes(this.searchText.toLowerCase()) &&
      (this.selectedTag ? a.tag === this.selectedTag : true)
    );
  }

  get paginatedArticles(): Article[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredArticles.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredArticles.length / this.pageSize);
  }

  changePage(p: number): void {
    if (p < 1 || p > this.totalPages) return;
    this.page = p;
  }

  trackById(_: number, item: Article) {
    return item.id;
  }
}
