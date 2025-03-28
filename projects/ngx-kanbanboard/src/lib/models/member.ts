export interface IMember {
    id?     : string | null
    name    : string
    avatar? : string | null
}

export class Member implements Required<IMember>
{
    id: string | null
    name: string
    avatar: string | null

    constructor(member: IMember)
    {
        this.id = member.id || null
        this.name = member.name
        this.avatar = member.avatar || null
    }
}