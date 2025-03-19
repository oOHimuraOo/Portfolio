import type { curso } from './cursoClass'
import { profile } from './profileClass'
import type { project } from './projectClass'

export class siteInfo {
  profile: profile
  courses: curso[]
  projects: project[]
  footer: footer

  constructor(p: profile, c: curso[], pr: project[], f: footer) {
    this.profile = p
    this.courses = c
    this.projects = pr
    this.footer = f
  }
}

export class footer {
  lastUpdate: string
  totalCourses: number
  certificates: number
  graduations: number
  views: number
  author: string
  madeIn: string
  expertise: string[]
  status: boolean

  constructor(
    l: string,
    tc: number,
    c: number,
    g: number,
    v: number,
    au: string,
    m: string,
    ex: string[],
    s: boolean,
  ) {
    this.lastUpdate = l
    this.views = v
    this.totalCourses = tc
    this.certificates = c
    this.graduations = g
    this.author = au
    this.madeIn = m
    this.expertise = ex
    this.status = s
  }
}
