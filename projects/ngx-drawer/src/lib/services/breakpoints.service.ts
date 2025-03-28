import { Inject, Injectable } from '@angular/core'
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout'
import { map, Observable, ReplaySubject, tap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BreakpointsService {
  private _onMediaChange: ReplaySubject<{ matchingAliases: string[]; matchingQueries: any }> = new ReplaySubject<{ matchingAliases: string[]; matchingQueries: any }>(1)
  private _breakpointObserver: BreakpointObserver

  private config = {
    // tailwind breakpoints
    breakpoints: {
        'print' : 'print',
        'sm'    : '(min-width: 640px)',
        'md'    : '(min-width: 768px)',
        'lg'    : '(min-width: 1024px)',
        'xl'    : '(min-width: 1280px)',
        '2xl'   : '(min-width: 1536px)'
    }
  }

  constructor(@Inject(BreakpointObserver)  _breakpointObserver: BreakpointObserver) {
    this._breakpointObserver = _breakpointObserver
    this._breakpointObserver.observe(Object.values(this.config.breakpoints)).pipe(
        tap(state => console.log(state)),
        map((state) => {
            // Prepare the observable values and set their defaults
            const matchingAliases: string[] = []
            const matchingQueries: any = {}

            // Get the matching breakpoints and use them to fill the subject
            const matchingBreakpoints = Object.entries(state.breakpoints).filter(([query, matches]) => matches) ?? []
            for ( const [query] of matchingBreakpoints ) {
                // Find the alias of the matching query
                const matchingAlias = Object.entries(this.config.breakpoints).find(([alias, q]) => q === query)![0]

                // Add the matching query to the observable values
                if ( matchingAlias ) {
                    matchingAliases.push(matchingAlias)
                    matchingQueries[matchingAlias] = query
                }
            }
            // Execute the observable
            this._onMediaChange.next({
                matchingAliases,
                matchingQueries
            })
        })
    ).subscribe()
  }

  get onMediaChange$(): Observable<{ matchingAliases: string[]; matchingQueries: any }> {
    return this._onMediaChange.asObservable();
  }

  onMediaQueryChange$(query: string | string[]): Observable<BreakpointState> {
    return this._breakpointObserver.observe(query);
  }
}
