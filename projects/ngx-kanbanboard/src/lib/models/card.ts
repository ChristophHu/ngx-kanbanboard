import { ILabel, Label } from "./label"

export interface ICard {
    id?         : string | null
    boardId     : string
    listId      : string
    position    : number
    title       : string
    description?: string | null
    labels?     : ILabel[]
    dueDate?    : string | null
}

export class Card implements Required<ICard>
{
    id: string | null
    boardId: string
    listId: string
    position: number
    title: string
    description: string | null
    labels: Label[]
    dueDate: string | null

    coverImage?: string | null

    constructor(card: ICard)
    {
        this.id = card.id || null
        this.boardId = card.boardId
        this.listId = card.listId
        this.position = card.position
        this.title = card.title
        this.description = card.description || null
        this.labels = []
        this.dueDate = card.dueDate || null

        // Labels
        if ( card.labels )
        {
            this.labels = card.labels.map((label: any) => {
                if ( !(label instanceof Label) )
                {
                    return new Label(label)
                }

                return label
            })
        }
    }
}