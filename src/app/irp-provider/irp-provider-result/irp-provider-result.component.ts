import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateService }       from '../../services/state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-irp-provider-result',
  templateUrl: './irp-provider-result.component.html',
  styleUrls: ['./irp-provider-result.component.scss']
})

export class IrpProviderResultComponent implements OnInit, OnDestroy {

    private irpResultSub: Subscription;
    private irpResult: string;
    
    constructor(private stateService: StateService,)
    {
	console.log('Entrée dans constructor');
    }

    ngOnInit() {
	this.irpResultSub = this.stateService.irpResult$.subscribe(
	    (str) => {
		console.log('Dans ngOnInit str',str);
		this.irpResult = str;
	    }
	);
  }

    ngOnDestroy() {
	this.irpResultSub.unsubscribe();
    }

}
