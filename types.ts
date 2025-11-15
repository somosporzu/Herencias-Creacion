
export interface Trait {
  id: string;
  name: string;
  description: string;
  ph: number;
}

export interface Herencia {
  name: string;
  description: string;
  naturaleza: string;
  traits: Trait[];
}
