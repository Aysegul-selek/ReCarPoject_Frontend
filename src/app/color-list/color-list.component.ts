import { Component } from '@angular/core';
import { Color } from '../models/color';
import { ColorService } from '../services/color.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent {
  colors: Color[] = [];

  constructor(private colorService: ColorService, private router: Router) {}

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
}
