import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpApiResponse } from 'src/app/core/models/http-api-response';
import { AppRoutes } from 'src/app/core/services/app-routes';
import { HttpServices } from 'src/app/core/services/http/http.service';
import { Airflight } from 'src/app/models/airflight';

@Injectable({
  providedIn: 'root',
})
export class AirfightService {
  constructor(private server: HttpServices<Airflight>) {}

  getAirflights(): Observable<HttpApiResponse<Airflight[]>> {
    return this.server.getList(AppRoutes.GET_LIST_CLIENTS);
  }

  postCliente(newClient: Airflight) {
    return this.server.post(AppRoutes.POST_CLIENT, newClient);
  }

  deleteCliente(id: number) {
    return this.server.delete(id);
  }

  putCliente(id: number, data: any) {
    return this.server.put(id, data);
  }
}
