import type { STATUS } from "./projectClass"

export class curso {
  name: string
  entidade: string
  tecnologia: string
  codigoCertificado: string
  status: STATUS
  icon: string
  descricao: string
  link: string

  constructor(n:string, e:string, t:string, c:string, s:STATUS, i:string, d:string, l:string) {
    this.name = n
    this.entidade = e
    this.tecnologia = t
    this.codigoCertificado = c
    this.status = s
    this.icon = i
    this.descricao = d
    this.link = l
  }
}
