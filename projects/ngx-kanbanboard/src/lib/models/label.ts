export interface ILabel {
    id      : string | null
    boardId : string
    title   : string
}

export class Label implements Required<ILabel>
{
    id: string | null
    boardId: string
    title: string

    constructor(label: ILabel)
    {
        this.id = label.id || null
        this.boardId = label.boardId
        this.title = label.title
    }
}