import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpApiResponse } from 'src/app/core/models/http-api-response';
import { AppRoutes } from 'src/app/core/services/app-routes';
import { HttpServices } from 'src/app/core/services/http/http.service';
import { Airflight } from 'src/app/models/airflight';

@Injectable({
  providedIn: 'root',
})
export class AirplaneFlightService {
  constructor(private server: HttpServices<Airflight>) {
  }

  getListAirplaneFlight(): Observable<HttpApiResponse<Airflight[]>> {
    return this.server.getList(AppRoutes.GET_AIRFLIGHT);
  }

  getAirplaneFlight(id: string): Observable<HttpApiResponse<Airflight>> {
    return this.server.get(AppRoutes.GET_AIRFLIGHT + '/' + id);
  }

  postAirplaneFlight(newClient: Airflight) {
    return this.server.post(AppRoutes.POST_CLIENT, newClient);
  }

  deleteAirplaneFlight(id: string) {
    return this.server.delete(id);
  }

  putAirplaneFlight(id: number, data: any) {
    return this.server.put(id, data);
  }
}
