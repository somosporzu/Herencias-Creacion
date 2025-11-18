
export interface Trait {
  id: string;
  name: string;
  description: string;
  ph: number;
  isCustom?: boolean;
  // FIX: Added optional category property to support trait categorization.
  category?: string;
}

export interface Herencia {
  name: string;
  description: string;
  naturaleza: string;
  traits: Trait[];
}