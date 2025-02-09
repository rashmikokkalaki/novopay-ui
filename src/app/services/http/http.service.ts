import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginCredentials } from 'src/app/models/LoginCredentials';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public baseUrl = environment.endpoint + '/novobank-core/api/v1';

  constructor(private _http: HttpClient) { }

  public cryptoResource(task: string): any {
    return this._http.get(`${this.baseUrl}/crypt/${task}`);
  }

  public authentication(loginCredentials: LoginCredentials): any {
    return this._http.post(`${this.baseUrl}/authentication`, loginCredentials);
  }

  public officeResource(officeId?: Number, associations?): any {
    let params = new HttpParams();
    params = associations ? params.append('associations', associations) : params;
    return this._http.get(`${this.baseUrl}/offices/${officeId}`, { params: params });
  }

  public configurationResource(id?: String): any {
    return this._http.get(`${this.baseUrl}/configurations/${id ? id : ''}`);
  }

  public logoutResource(): any {
    return this._http.post(`${this.baseUrl}/authentication/logout`, '');
  }

  public getTaskResource(type?: any, name?: any, taskId?: number, status?: any,
    isSubsidiary?: boolean, officeId?: number, userId?: number,
    verticalId?: number, limit?: number): any {
    let params = new HttpParams();
    params = status[0] ? params.append('status', status[0]) : params;
    params = status[1] ? params.append('status', status[1]) : params;
    params = isSubsidiary != null ? params.append('isSubsidiary', isSubsidiary.toString()) : params;
    params = officeId ? params.append('officeId', officeId.toString()) : params;
    params = userId ? params.append('userId', userId.toString()) : params;
    params = verticalId != null ? params.append('verticalId', verticalId.toString()) : params;
    params = limit != null ? params.append('limit', limit.toString()) : params;

    return this._http.get(`${this.baseUrl}/tasks${type ? `/${type}` : ''}` +
      `${name ? `/${name}` : ''}${taskId ? `/${taskId}` : ''}`,
      { params: params });
  }

  public postTaskResource(type?: any, name?: any, taskId?: number, command?: string,
    data?: any): any {
    let params = new HttpParams();
    params = command ? params.append('command', command) : params;

    return this._http.post(`${this.baseUrl}/tasks${type ? `/${type}` : ''}${name ? `/${name}` : ''}${taskId ? `/${taskId}` : ''}`,
      data, { params: params });
  }

  public codeValuesResource(codeName?: string, context?: string): any {
    let params = new HttpParams();
    params = context ? params.append('context', context) : params;

    return this._http.get(`${this.baseUrl}/codes/codevalues/${codeName ? codeName : ''}`, { params: params });
  }

  public clientTemplateResource(): any {
    let params = new HttpParams();
    params = params.append('staffInSelectedOfficeOnly', 'true');
    params = params.append('loanOfficersOnly', 'true');
    params = params.append('roleName', 'Loan Officer');
    return this._http.get(`${this.baseUrl}/clients/template`, { params: params });
  }

  public getSalutationMatrix(): any {
    return this._http.get(`${this.baseUrl}/salutationmatrix`);
  }

  public getcountryDetailResource(): any {
    let params = new HttpParams();
    params = params.append('limit', '-1');
    return this._http.get(`${this.baseUrl}/countrydetail`, { params: params });
  }

  public getstateDetailResource(countryId): any {
    let params = new HttpParams();
    params = params.append('countryId', countryId);
    params = params.append('limit', '-1');
    return this._http.get(`${this.baseUrl}/statedetail`, { params: params });
  }

  public getdistrictDetailResource(stateId, countryId): any {
    let params = new HttpParams();
    params = params.append('countryId', countryId);
    params = params.append('stateId', stateId);
    params = params.append('limit', '-1');
    return this._http.get(`${this.baseUrl}/districtdetail`, { params: params });
  }

  public getvillageTownCityDetailResource(districtId): any {
    let params = new HttpParams();
    params = params.append('districtId', districtId);
    params = params.append('limit', '-1');
    return this._http.get(`${this.baseUrl}/villagetowncitydetail`, { params: params });
  }

  public employeeResource(staffId?): any {
    return this._http.get(`${this.baseUrl}/staff${staffId ? `/${staffId}` : ''}`);
  }

  public loanProductResource(loanProductId?, resourceType?): any {
    return this._http.get(`${this.baseUrl}/loanproducts${loanProductId ? `/${loanProductId}` : ''}${resourceType ? `/${resourceType}` : ''}`);
  }

  public insuranceProductListResource(): any {
    return this._http.get(`${this.baseUrl}/insuranceproducts`);
  }

  public getclientResource(clientId?, resource?, resourceId?, getDemographicsStatus?): any {
    let params = new HttpParams();
    params = getDemographicsStatus ? params.append('getDemographicsStatus', getDemographicsStatus) : params;
    return this._http.get(`${this.baseUrl}/clients${clientId ? `/${clientId}` : ''}${resource ? `/${resource}` : ''}${resourceId ? `/${resourceId}` : ''}`, { params: params });
  }

  public getClientImage(clientId): any {
    return this._http.get(`${this.baseUrl}/clients/${clientId}/images?maxHeight=300`,{responseType: 'text'});
  }


}
