import { Component, ElementRef, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from '../../models/board';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from '../../models/list';
import { Card } from '../../models/card';
import { NgFor } from '@angular/common';

@Component({
  selector: 'lib-board',
  imports: [
    NgFor
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.sass'
})
export class BoardComponent {
  board: Board
  deg: number = 0

  @ViewChild('myIdentifier') myIdentifier!: ElementRef
  @ViewChild('dragPlaceholder') dragPlaceholder!: ElementRef

  open: boolean =  true
  height: number = 200
  @ViewChild('matDrawer', {static: true}) matDrawer!: MatDrawer

  listTitleForm!: FormGroup;

  private readonly _positionStep: number = 65536
  private readonly _maxListCount: number = 200
  private readonly _maxPosition: number = this._positionStep * 500
  private _unsubscribeAll: Subject<any> = new Subject<any>()
  
  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _location: Location) {
      this.board = _activatedRoute.snapshot.data['board']
      console.log(this.board)
  }

  ngOnInit(): void { }

  close() {
    this.matDrawer.close()
    // this._router.navigate('..')
    this._location.back()
  }

  dragStart(event: any) {
    console.log(event.source.element.nativeElement.offsetHeight)
    // this.dragPlaceholder.nativeElement.height = '300px'
    // console.log(event.source.element.nativeElement)
    this.height = event.source.element.nativeElement.offsetHeight
    // this.height = 300
    event.source._dragRef._initialTransform = `rotate(3deg)`
  }

  renameList(listTitleInput: HTMLElement): void {
      // Use timeout so it can wait for menu to close
      setTimeout(() => {
          listTitleInput.focus();
      });
  }

  addList(title: string): void {
      // Limit the max list count
      if ( this.board.lists.length >= this._maxListCount )
      {
          return;
      }

      // Create a new list model
      const list = new List({
          boardId : this.board.id!,
          position: this.board.lists.length ? this.board.lists[this.board.lists.length - 1].position + this._positionStep : this._positionStep,
          title   : title
      });

      // Save the list
      // this._scrumboardService.createList(list).subscribe();
  }

  updateListTitle(event: any, list: List): void {
      // Get the target element
      const element: HTMLInputElement = event.target;

      // Get the new title
      const newTitle = element.value;

      // If the title is empty...
      if ( !newTitle || newTitle.trim() === '' )
      {
          // Reset to original title and return
          element.value = list.title;
          return;
      }

      // Update the list title and element value
      list.title = element.value = newTitle.trim();

      // Update the list
      // this._scrumboardService.updateList(list).subscribe();
  }

  deleteList(id: string): void {
      // Open the confirmation dialog
      // const confirmation = this._fuseConfirmationService.open({
      //     title  : 'Delete list',
      //     message: 'Are you sure you want to delete this list and its cards? This action cannot be undone!',
      //     actions: {
      //         confirm: {
      //             label: 'Delete'
      //         }
      //     }
      // });

      // Subscribe to the confirmation dialog closed action
      // confirmation.afterClosed().subscribe((result) => {

      //     // If the confirm button pressed...
      //     if ( result === 'confirmed' )
      //     {

      //         // Delete the list
      //         this._scrumboardService.deleteList(id).subscribe();
      //     }
      // });
  }

  listDropped(event: CdkDragDrop<List[]>): void {
      // Move the item
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      // Calculate the positions
      // const updated = this._calculatePositions(event);

      // Update the lists
      // this._scrumboardService.updateLists(updated).subscribe();
  }

  addCard(list: List, title: string): void {
      // Create a new card model
      const card = new Card({
          boardId : this.board.id!,
          listId  : list.id,
          position: list.cards.length ? list.cards[list.cards.length - 1].position + this._positionStep : this._positionStep,
          title   : title
      });

      // Save the card
      //   this._scrumboardService.createCard(card).subscribe();
  }

  cardDropped(event: CdkDragDrop<Card[]>): void {
      // Move or transfer the item
      if ( event.previousContainer === event.container )
      {
          // Move the item
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      }
      else
      {
          // Transfer the item
          transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

          // Update the card's list it
          event.container.data[event.currentIndex].listId = event.container.id;
      }

      // Calculate the positions
      const updated = this._calculatePositions(event);

      // Update the cards
      // this._scrumboardService.updateCards(updated).subscribe();
  }

  isOverdue(date: string): boolean {
      // return moment(date, moment.ISO_8601).isBefore(moment(), 'days');
      return true
  }

  private _calculatePositions(event: CdkDragDrop<any[]>): any[] {
      // Get the items
      let items = event.container.data;
      const currentItem = items[event.currentIndex];
      const prevItem = items[event.currentIndex - 1] || null;
      const nextItem = items[event.currentIndex + 1] || null;

      // If the item moved to the top...
      if ( !prevItem )
      {
          // If the item moved to an empty container
          if ( !nextItem )
          {
              currentItem.position = this._positionStep;
          }
          else
          {
              currentItem.position = nextItem.position / 2;
          }
      }
      // If the item moved to the bottom...
      else if ( !nextItem )
      {
          currentItem.position = prevItem.position + this._positionStep;
      }
      // If the item moved in between other items...
      else
      {
          currentItem.position = (prevItem.position + nextItem.position) / 2;
      }

      // Check if all item positions need to be updated
      if ( !Number.isInteger(currentItem.position) || currentItem.position >= this._maxPosition )
      {
          // Re-calculate all orders
          items = items.map((value, index) => {
              value.position = (index + 1) * this._positionStep;
              return value;
          });

          // Return items
          return items;
      }

      // Return currentItem
      return [currentItem];
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
