import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-button',
  templateUrl: './load-button.component.html',
  styleUrl: './load-button.component.css'
})
export class LoadButtonComponent implements OnInit {

  @Input() hasMore: boolean = false;

  ngOnInit(): void {
  }
  
}
