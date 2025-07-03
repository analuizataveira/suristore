export interface Map {
  id: string
  name: string
  image: string
  layout: string
  bestAgents: string[]
  description: string
  callouts: Callout[]
}

export interface Callout {
  name: string
  position: {
    x: number
    y: number
  }
}
