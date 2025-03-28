import { Card, ICard } from "./card"

export interface IList {
    id?     : string | null
    boardId : string
    position: number
    title   : string
    cards?  : ICard[]
}

export class List implements Required<IList>
{
    id: string
    boardId: string
    position: number
    title: string
    cards: Card[]

    constructor(list: IList)
    {
        this.id = list.id || '0'
        this.boardId = list.boardId
        this.position = list.position
        this.title = list.title
        this.cards = []

        // Cards
        if ( list.cards )
        {
            this.cards = list.cards.map((card: any) => {
                if ( !(card instanceof Card) )
                {
                    return new Card(card)
                }

                return card
            })
        }
    }
}