import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = './api/json.php';
  constructor(
    private messageService: MessageService,
    private httpClient: HttpClient,

  ) { }


  getHeroes(): Observable<Hero[]> {
    // const heroes = of(HEROES);
    // this.messageService.add('HeroService: fetched heroes');
    // return heroes;
    return this.httpClient.get<Hero[]>(this.heroesUrl).pipe(
      tap(data => { this.log('fetched heroes2'); }),
      catchError(this.handleError<Hero[]>('get Heroe1s', []))
    )
  }

  // getHero(id: number): Observable<Hero> {
  //   const hero = HEROES.find(h => h.id === id)!;
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(hero);
  // }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}?id=${id}`;
    return this.httpClient.get<Hero>(url).pipe(
      tap(data => { this.log(`가져오기성공 fetched hero id = ${id}`) }),
      catchError(this.handleError<Hero>(`존재하지 않는 히어로 getHero id = ${id}`))
    )
  }

  updateHero(hero: Hero): Observable<any> {
    return this.httpClient.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(data => { this.log(`업데이트 성공 update hero id = ${hero.id}`) }),
      catchError(this.handleError<any>('업데이트 에러 updateHero'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
  };

  addHero(hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => { this.log(`새로운저장 완료 w/ id= ${newHero.id}`) }),
      catchError(this.handleError<Hero>('새로운저장이 실패 하였습니다'))
    );
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}?id=${id}`;
    return this.httpClient.delete<Hero>(url, this.httpOptions).pipe(
      tap(data => this.log(`삭제되었습니다 deleted hero id= ${id}`)),
      catchError(this.handleError<Hero>('삭제실패 deleteHero'))
    );
  }


  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // 입력된 내용이 없으면 빈 배열을 반환
      return of([]);
    }
    const url = `${this.heroesUrl}?name=${term}`;
    return this.httpClient.get<Hero[]>(url).pipe(
      tap(x => x.length ?
        this.log(`히어로를 찾았습니다 found heroes matching "${term}"`) :
        this.log(`히어로가 목록에 존재하지 않습니다 no heroese matching "${term}"`)
      ),
      catchError(this.handleError<Hero[]>('검색을 불러올수 없습니다', []))
    );
  }



  /**
 * HTTP 요청이 실패한 경우를 처리합니다.
 * 애플리케이션 로직 흐름은 그대로 유지됩니다.
 * @param operation - 실패한 동작의 이름
 * @param result - 기본값으로 반환할 객체
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: 리모트 서버로 에러 메시지 보내기
      console.error(error); // 지금은 콘솔에 로그를 출력합니다.
      // TODO: 사용자가 이해할 수 있는 형태로 변환하기
      this.log(`내용 : ${operation} failed333: ${error.message}`);

      // 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환합니다.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
