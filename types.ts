
export interface Trait {
  id: string;
  name: string;
  description: string;
  ph: number;
  isCustom?: boolean;
}

export interface Herencia {
  name: string;
  description: string;
  naturaleza: string;
  traits: Trait[];
}