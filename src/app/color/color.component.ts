import { Component } from '@angular/core';
import { Color } from '../models/color';
import { ColorService } from '../services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent {
colors:Color[]=[];
dataLoaded = false;
constructor(private colorService: ColorService) {}
ngOnInit(): void {
  this.getColors();
}
getColors() {
  this.colorService.getColors().subscribe((response) => {
    this.colors = response.data;
    this.dataLoaded=true;
  });
}
}