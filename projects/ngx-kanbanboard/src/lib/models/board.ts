import { ILabel, Label } from "./label"
import { IList, List } from "./list"
import { IMember, Member } from "./member"

export interface IBoard {
    id?             : string | null
    title           : string
    description?    : string | null
    icon?           : string | null
    lastActivity?   : Date | null
    lists?          : IList[]
    labels?         : ILabel[]
    members?        : IMember[]
}

export class Board implements Required<IBoard>
{
    id: string | null
    title: string
    description: string | null
    icon: string | null
    lastActivity: Date | null
    lists: List[]
    labels: Label[]
    members: Member[]

    constructor(board: IBoard)
    {
        this.id = board.id || null
        this.title = board.title
        this.description = board.description || null
        this.icon = board.icon || null
        this.lastActivity = board.lastActivity || null
        this.lists = []
        this.labels = []
        this.members = []

        // Lists
        if ( board.lists )
        {
            this.lists = board.lists.map((list: any) => {
                if ( !(list instanceof List) )
                {
                    return new List(list)
                }

                return list
            })
        }

        // Labels
        if ( board.labels )
        {
            this.labels = board.labels.map((label: any) => {
                if ( !(label instanceof Label) )
                {
                    return new Label(label)
                }

                return label
            })
        }

        // Members
        if ( board.members )
        {
            this.members = board.members.map((member: any) => {
                if ( !(member instanceof Member) )
                {
                    return new Member(member)
                }

                return member
            })
        }
    }
}