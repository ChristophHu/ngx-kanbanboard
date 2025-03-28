import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Card } from '../../models/card';

@Component({
  selector: 'lib-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass'
})
export class CardComponent implements OnInit {
  card: Card
  cardInformation: FormGroup

  constructor(private _boardComponent: BoardComponent, private _activatedRoute: ActivatedRoute, private _formBuilder: FormBuilder) {
    this.card = _activatedRoute.snapshot.data['card']
    this.cardInformation = this._formBuilder.group({
      title       : ['', [Validators.required]],
      description : [''],
      dueDate     : ['']
    })

    this.cardInformation.patchValue(this.card)
  }

  ngOnInit(): void {
    this._boardComponent.matDrawer.open()
  }

  closeDrawer(): Promise<MatDrawerToggleResult> {
    return this._boardComponent.matDrawer.close()
  }
}
