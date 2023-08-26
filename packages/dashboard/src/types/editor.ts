export interface IFontFamily {
  id: string
  fullName: string
  family: string
  style: string
  url: string
  postScriptName: string
  preview: string
  category: string
}

export interface TextOptions {
  underline: boolean
  textAlign: string
  fontSize: number
  fill: string
  charSpacing: number
  lineHeight: number
  fontFamily: string
  isGroup: boolean
  isMultiple: boolean
  styles: any[]
  font: any
  activeStyle: any
}
