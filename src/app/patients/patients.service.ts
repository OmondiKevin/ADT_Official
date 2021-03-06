import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Patient, Illness, Allergies, Source, Service, date, Locations, FamilyPlanning } from './patients';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class PatientsService {

    // To be placed in a config file
    private _apiUrl = 'http://192.168.133.10/adt-core/lib/public/api/';

    private _addPatientRoute = this._apiUrl + 'patients';
    private _illnessApi = this._apiUrl + 'lists/illnesses';
    private _allergiesApi = this._apiUrl + 'lists/allergies';
    private _sourcesApi = this._apiUrl + 'lists/patientsources';
    private _servicesApi = this._apiUrl + 'lists/services';
    private _regimenApi = this._apiUrl + 'lists/regimen';
    private _prophylaxisApi = this._apiUrl + 'lists/prophylaxis';
    private _whoStageApi = this._apiUrl + 'lists/whostage';
    private _pepReasonApi = this._apiUrl + 'lists/pep';
    private _locationsApi = this._apiUrl + 'lists/counties';
    private _familyPlanning = this._apiUrl + 'lists/familyplanning';
    private _patientsList = this._apiUrl + 'patients?page=';

    constructor(private _http: Http) { }

    /**
     * GET Section
     */
    getPaginatedPatients(id: number) {
        return this._http.get(this._patientsList + id)
            .map((response: Response) => <Patient[]>response.json())
            // .do(data => console.log('All: ' + JSON.stringify(data)))z
            .catch(this.handleError);
    }

    getFamilyPlan() {
        return this._http.get(this._servicesApi)
            .map((response: Response) => <FamilyPlanning[]>response.json())
            // .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getPatients() {
        return this._http.get(this._addPatientRoute)
            .map((response: Response) => <Patient[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getPatient(id: number) {
        return this._http.get(this._addPatientRoute + `/${id}`)
            .map((response: Response) => <Patient[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getLocation() {
        return this._http.get(this._locationsApi)
            .map((response: Response) => <Locations[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getServices() {
        return this._http.get(this._servicesApi)
            .map((response: Response) => <Service[]>response.json())
            // .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    // Loops through the lists of services to get individual service properties
    // such as different regimens

    getService(id: number): Observable<any> {
        return this.getServices()
            .map((service: Service[]) => service.find(p => p.id === id))
            .do(data => console.log('Service: ' + JSON.stringify(data)));
    }

    getRegimen() {
        return this._http.get(this._regimenApi)
            .map(res => res.json());
    }

    getProphylaxis() {
        return this._http.get(this._prophylaxisApi)
            .map(res => res.json());
    }

    getWho_stage() {
        return this._http.get(this._whoStageApi)
            .map(res => res.json());
    }
    getSource() {
        return this._http.get(this._sourcesApi)
            .map((response: Response) => <Source[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }



    getIllness(): Observable<Illness[]> {
        return this._http.get(this._illnessApi)
            .map((response: Response) => <Illness[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getAllergies(): Observable<Allergies[]> {
        return this._http.get(this._allergiesApi)
            .map((response: Response) => <Allergies[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    /**
     * POST Section
     */
    // Add a new patient
    addPatient(body: Object): Observable<Patient[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this._http.post(this._addPatientRoute, body, options) // ...using post request
            .map(() => body) // ...and calling .json() on the response to return data
            .catch(this.handleError); //...errors if any
    }

    /**
     * PUT Section: Update of patients takes place.
     */
    updatePatient(body: Object): Observable<Patient> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this._http.put(`${this._addPatientRoute}/${body['id']}`, body, options) // ...using put request
            .map(() => body)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if a
    }
    /**
     * PUT Section: Update of patients takes place.
     */
    disablePatient(id:string): Observable<Patient> {
        return this._http.delete(`${this._addPatientRoute}/${id}`) // ...using put request
            .map(() => { })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if a
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    }
}