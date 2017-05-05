import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <p>
      loading Works!
    </p>
  `,
  styles: []
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
