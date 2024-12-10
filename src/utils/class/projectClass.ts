export enum STATUS {
  COMPLETED,
  IN_DEVELOPMENT,
  DROPPED
}

export class subProject {
  name: string
  url: string
  description: string
  conclusion: string
  status: STATUS
  icon: string
  tech: string

  constructor(n:string, u:string, d:string, c:string, s:STATUS, i:string, t:string) {
    this.name = n
    this.url = u
    this.description = d
    this.conclusion = c
    this.status = s
    this.icon = i
    this.tech = t
  }
}

export class project {
  name: string
  subProjects: subProject[]
  url: string
  description: string
  conclusion: string
  status: STATUS
  icon: string
  tech: string

  constructor(n:string, s:subProject[], u:string, d:string, c:string, st:STATUS, i:string, t:string) {
    this.name = n
    this.subProjects = s
    this.url = u
    this.description = d
    this.conclusion = c
    this.status = st
    this.icon = i
    this.tech = t
  }
}
