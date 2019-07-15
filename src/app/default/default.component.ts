import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})

export class DefaultComponent implements OnInit {

    constructor(private router: Router) {
	console.log('Entrée dans constructor')
    }

    ngOnInit() {
	console.log('Entrée dans ngOnInit')
    }
    
    onNavigate(endpoint: string) {
	console.log('Entrée dans onNavigate avec endpoint ', endpoint)
	this.router.navigate([endpoint]);
    }
}
