import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'boot-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input() opciones!: string[];
  @Input() colorfondo!: string;

  ngOnInit(): void {
  }
}
