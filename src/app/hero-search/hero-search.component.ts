import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  public heroes$!: Observable<Hero[]>;
  private searchTearms = new Subject<string>();

  constructor(
    private heroService: HeroService,
  ) { }

  ngOnInit(): void {
    this.heroes$ = this.searchTearms.pipe(
      // 연속된 키 입력을 처리하기 위해 300ms 대기
      debounceTime(300),
      // 이전에 입력한 검색어와 같으면 무시
      distinctUntilChanged(),
      // 검색어가 변경되면 새로운 옵저버블을 생성함
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

  search(term: string): void {
    this.searchTearms.next(term);
  }

}
