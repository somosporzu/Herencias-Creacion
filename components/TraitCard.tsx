import React from 'react';
import { type Trait } from '../types';

interface TraitCardProps {
  trait: Trait;
  onAddTrait: (trait: Trait) => void;
  isAdded?: boolean;
}

const TraitCard: React.FC<TraitCardProps> = ({ trait, onAddTrait, isAdded = false }) => {
  const phColor = trait.ph > 0 ? 'text-green-400' : 'text-red-400';
  const phSign = trait.ph > 0 ? '+' : '';

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md flex flex-col justify-between transition-transform transform hover:scale-105">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-bold text-lg text-amber-300">{trait.name}</h4>
          <span className={`font-black text-xl ${phColor}`}>{phSign}{trait.ph} PH</span>
        </div>
        <p className="text-gray-300 text-sm">{trait.description}</p>
      </div>
      <button
        onClick={() => onAddTrait(trait)}
        disabled={isAdded}
        aria-label={`Añadir rasgo ${trait.name}`}
        className="mt-4 w-full bg-amber-600 text-white font-bold py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {isAdded ? 'Añadido' : 'Añadir'}
      </button>
    </div>
  );
};

export default TraitCard;
