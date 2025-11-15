import React, { useState, useMemo } from 'react';
import { type Trait } from '../types';
import TraitCard from './TraitCard';

interface TraitLibraryProps {
  allTraits: Trait[];
  onAddTrait: (trait: Trait) => void;
}

const TraitCategory: React.FC<{ title: string; traits: Trait[]; onAddTrait: (trait: Trait) => void; }> = ({ title, traits, onAddTrait }) => (
    <div>
        <h3 className="text-xl font-bold text-amber-400 mt-6 mb-3 border-b border-gray-600 pb-2">{title}</h3>
        {traits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {traits.map(trait => <TraitCard key={trait.id} trait={trait} onAddTrait={onAddTrait} />)}
            </div>
        ) : (
            <p className="text-gray-500 italic">No hay rasgos que coincidan con la búsqueda.</p>
        )}
    </div>
);


const TraitLibrary: React.FC<TraitLibraryProps> = ({ allTraits, onAddTrait }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showCustom, setShowCustom] = useState(false);
    const [customTrait, setCustomTrait] = useState({ name: '', description: '', ph: 1 });

    const filteredTraits = useMemo(() => {
        return allTraits.filter(trait =>
            trait.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            trait.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [allTraits, searchTerm]);

    const handleAddCustomTrait = (e: React.FormEvent) => {
        e.preventDefault();
        if(!customTrait.name || !customTrait.description) return;
        const newTrait: Trait = {
            ...customTrait,
            id: `custom-${Date.now()}`
        };
        onAddTrait(newTrait);
        setCustomTrait({ name: '', description: '', ph: 1 });
        setShowCustom(false);
    }

    return (
        <aside className="bg-gray-800 shadow-2xl rounded-lg p-6">
            <h2 className="text-2xl font-bold text-amber-400 mb-4 border-b-2 border-gray-700 pb-2">Biblioteca de Rasgos</h2>
            <input
                type="text"
                placeholder="Buscar rasgos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mb-4 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
            
            <button
                onClick={() => setShowCustom(!showCustom)}
                className="w-full mb-4 bg-gray-600 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
                {showCustom ? 'Ocultar Creador de Rasgos' : 'Crear Rasgo Personalizado'}
            </button>

            {showCustom && (
                <form onSubmit={handleAddCustomTrait} className="bg-gray-700 p-4 rounded-lg mb-4 space-y-3">
                    <input type="text" placeholder="Nombre del Rasgo" value={customTrait.name} onChange={e => setCustomTrait({...customTrait, name: e.target.value})} required className="w-full bg-gray-600 rounded p-2"/>
                    <textarea placeholder="Descripción" value={customTrait.description} onChange={e => setCustomTrait({...customTrait, description: e.target.value})} required className="w-full bg-gray-600 rounded p-2" rows={2}></textarea>
                    <div className="flex items-center gap-4">
                        <label htmlFor="custom-ph" className="font-bold">PH:</label>
                        <input type="number" id="custom-ph" value={customTrait.ph} onChange={e => setCustomTrait({...customTrait, ph: parseInt(e.target.value, 10) || 0})} className="w-20 bg-gray-600 rounded p-2"/>
                        <button type="submit" className="flex-grow bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Añadir Rasgo</button>
                    </div>
                </form>
            )}

            <div className="max-h-[60vh] overflow-y-auto pr-2">
                <TraitCategory title="Ventajas (+3 PH)" traits={filteredTraits.filter(t => t.ph === 3)} onAddTrait={onAddTrait} />
                <TraitCategory title="Ventajas (+2 PH)" traits={filteredTraits.filter(t => t.ph === 2)} onAddTrait={onAddTrait} />
                <TraitCategory title="Ventajas (+1 PH)" traits={filteredTraits.filter(t => t.ph === 1)} onAddTrait={onAddTrait} />
                <TraitCategory title="Desventajas (-1 PH)" traits={filteredTraits.filter(t => t.ph === -1)} onAddTrait={onAddTrait} />
                <TraitCategory title="Desventajas (-2 PH)" traits={filteredTraits.filter(t => t.ph === -2)} onAddTrait={onAddTrait} />
                <TraitCategory title="Desventajas (-3 PH)" traits={filteredTraits.filter(t => t.ph === -3)} onAddTrait={onAddTrait} />
            </div>
        </aside>
    );
};

export default TraitLibrary;
