import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.css']
})
export class CodesComponent implements OnInit {
  activeTab: string='task';

  constructor() { }

  ngOnInit(): void {
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}