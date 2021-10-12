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


    this.activatedRoute.params
    .subscribe( ({ termino }) => {
      console.log(termino);
    })
  }

  buscar( termino: string ){

    if(termino.length === 0 ){
          this.router.navigateByUrl(`/`)
        }
  
      this.router.navigateByUrl(`/buscar/libros/${termino}`);
  
    }
  
}
