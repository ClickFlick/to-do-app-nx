import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';

export abstract class BaseService {
  protected http = inject(HttpClient);

  constructor(protected basePath: string) {}

  protected get<T>(path: string, endPath : string, params?: Record<string, any>) {
    return this.http.get<T>(`${this.basePath}/${path}${endPath}`, {
      params: this.toParams(params),
    });
  }

  protected post<T>(path: string, body?: T, params?: Record<string, any>) {
    return this.http.post<T>(`${this.basePath}/${path}`, body, {
      params: this.toParams(params),
    });
  }

  protected put<T>(path: string, body?: T, params?: Record<string, T>) {
    return this.http.put<T>(`${this.basePath}/${path}`, body, {
      params: this.toParams(params),
    });
  }

  protected delete<T>(path: string, params?: Record<string, T>) {
    return this.http.delete<T>(`${this.basePath}/${path}`, {
      params: this.toParams(params),
    });
  }

  private toParams(params?: Record<string, any>): HttpParams | undefined {
    if (!params) return undefined;

    let httpParams = new HttpParams();

    Object.keys(params).forEach(key => {
      const value = params[key];
      if (value !== undefined && value !== null) {
        httpParams = httpParams.append(key, value);
      }
    });

    return httpParams;
  }
}
