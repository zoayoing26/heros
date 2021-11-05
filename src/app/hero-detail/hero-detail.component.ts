import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  public hero: Hero | undefined;

  constructor(
    private activateRoute: ActivatedRoute,
    private location: Location,
    private heroService: HeroService,
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(hero => {
      this.hero = hero;
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe((e) => {
        this.goBack();
      });
    }
  }


}
