import { Component, OnInit } from '@angular/core';
import {  faSearch } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  faSearch = faSearch;
  

  constructor( private activatedRoute : ActivatedRoute, private router:Router) { }

  ngOnInit(): void {


   
  }

  buscar( termino: string ){

    console.log(termino);
    if(termino.trim().length === 0  ){
          return;
        }
        else{
          this.router.navigateByUrl(`/buscar/libros/${termino}`);


        }
  
  
    }

    public inputValidator(event: any) {
      //console.log(event.target.value);
      const pattern = /^[a-zA-Z0-9- ]*$/;   
      //let inputChar = String.fromCharCode(event.charCode)
      if (!pattern.test(event.target.value)) {
        event.target.value = event.target.value.replace(/[^a-zA-Z0-9]/g, "");
        // invalid character, prevent input
  
      }
    }
  
}
