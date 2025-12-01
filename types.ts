
export interface Trait {
  id: string;
  name: string;
  description: string;
  ph: number;
  isCustom?: boolean;
  category?: string;
}

export interface Herencia {
  name: string;
  description: string;
  naturaleza: string;
  traits: Trait[];
}