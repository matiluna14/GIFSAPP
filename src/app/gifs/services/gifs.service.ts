import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

 constructor(private http: HttpClient){
   if( localStorage.getItem("historialLocalStorage") ){
     this._historial = JSON.parse( localStorage.getItem("historialLocalStorage")! );
   }

   if( localStorage.getItem("resultadosLocalStorage") ){
     this.resultados = JSON.parse( localStorage.getItem("resultadosLocalStorage")! );
   }
 } 

 private apiKey: string = "mbUtY5C40UT2Yduxkas4NoMyUiBJma5G"; 
 private servicioUrl: string = "https://api.giphy.com/v1/gifs";

 public resultados: Gif[] = [];



 private _historial: string[] = [];

 get historial(){
   return [...this._historial];
 }


 buscarGifs( query: string) {

  query = query.trim().toLocaleLowerCase();

  if(!this._historial.includes(query) && query !== ""){
    this._historial.unshift(query);

    localStorage.setItem("historialLocalStorage", JSON.stringify(this._historial));
    
  }


  const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('q', query)
        .set('limit', '10');
        

   
  this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
    .subscribe( (resp) => {
      console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem("resultadosLocalStorage", JSON.stringify(this.resultados));
    })
   
 }
}
