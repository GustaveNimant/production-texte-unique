import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})

export class MainMenuComponent implements OnInit {

    constructor(private router: Router) {
	console.log('Entrée dans constructor')
    }

    ngOnInit() {
	console.log('Entrée dans ngOnInit')
    }
    
    onNavigate(endpoint: string) {
	console.log('Entrée dans onNavigate avec endpoint', endpoint)
	this.router.navigate([endpoint]);
    }
}
