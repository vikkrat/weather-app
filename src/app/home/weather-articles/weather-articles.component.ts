import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherArticlesService } from './weather-articles.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-articles',
  templateUrl: './weather-articles.component.html',
  styleUrls: ['./weather-articles.component.scss']
})
export class WeatherArticlesComponent implements OnInit, OnDestroy {
  public iconsCarouselOptions: {} ;
  public weatherArticles: [];
  public weatherArticlesSub$: Subscription;

  constructor(
    private sanitizer: DomSanitizer,
    private weatherArticlesService: WeatherArticlesService
  ) { }

  ngOnInit() {
    this.iconsCarouselOptions = {
      items: 3,
      dots: false,
      loop: true,
      nav: false,
      autoplay: true,
      autoplayTimeout: 7000,
      autoplayHoverPause: true,
      margin: 15
    };

    this.getWeatherArticles();
  }

  getWeatherArticles() {
    this.weatherArticlesSub$ = this.weatherArticlesService.loadArticles().subscribe(
      data => {
        this.weatherArticles = data;
      }
    );
  }

  ngOnDestroy(): void {
    this.weatherArticlesSub$.unsubscribe();
  }

}
