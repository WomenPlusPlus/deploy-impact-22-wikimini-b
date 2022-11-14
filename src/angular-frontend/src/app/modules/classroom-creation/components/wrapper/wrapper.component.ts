import { Component, OnInit } from '@angular/core';
import { ClassroomCreationSharedService } from '../../classroom-creation-shared.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {

  constructor(
    public ccShared: ClassroomCreationSharedService
  ) { }

  ngOnInit(): void {
  }

}
