import type { curso } from "./cursoClass";
import { profile } from "./profileClass";
import type { project } from "./projectClass";

export class siteInfo {
  profile: profile
  courses: curso[]
  projects: project[]
  footer: footerInfo

  constructor(p:profile, c:curso[], pr:project[], f:footerInfo) {
    this.profile = p
    this.courses = c
    this.projects = pr
    this.footer = f
  }
}

export class footerInfo {
  lastUpdate: string
  views: number
  errors: number
  alert: number
  author: string
  madeIn: string
  expertise: string[]
  status: boolean

  constructor(l:string, v:number, e:number, a:number, au:string, m:string, ex:string[], s:boolean) {
    this.lastUpdate = l
    this.views = v
    this.errors = e
    this.alert = a
    this.author = au
    this.madeIn = m
    this.expertise = ex
    this.status = s
  }
}
