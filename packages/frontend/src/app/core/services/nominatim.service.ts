import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { SearchResult } from '../models/SearchResult'

@Injectable()
export class NominatimService {
  nominatimUrl = environment.nominatim

  constructor(private httpClient: HttpClient) {}

  public search(search: string): Observable<SearchResult[]> {
    const params = new HttpParams({
      fromObject: {
        q: search,
        format: 'json',
        limit: 1
      }
    })

    return this.httpClient.get<SearchResult[]>(`${this.nominatimUrl}/search`, {
      params
    })
  }
}
