import { Injectable } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class PreviousRouteService {

  private previousUrl!: string
  private currentUrl: string

  public constructor(private router: Router) {
    this.currentUrl = this.router.url
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl
        this.currentUrl = event.url
      }
    })
  }

  public getPreviousUrl(): string {
    return this.previousUrl
  }
}
