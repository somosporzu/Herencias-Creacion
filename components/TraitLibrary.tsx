import React, { useState, useMemo } from 'react';
import { type Trait } from '../types';
import TraitCard from './TraitCard';

interface TraitLibraryProps {
  allTraits: Trait[];
  onAddTrait: (trait: Trait) => void;
  selectedTraits: Trait[];
}

type PhFilter = 'all' | 'advantages' | 'disadvantages' | 'pm1' | 'pm2' | 'pm3';

const FilterButton: React.FC<{
  label: string;
  filterValue: PhFilter;
  currentFilter: PhFilter;
  setFilter: (filter: PhFilter) => void;
}> = ({ label, filterValue, currentFilter, setFilter }) => {
  const isActive = currentFilter === filterValue;
  return (
    <button
      onClick={() => setFilter(filterValue)}
      className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
        isActive
          ? 'bg-amber-600 text-white'
          : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
      }`}
    >
      {label}
    </button>
  );
};

const TraitCategory: React.FC<{ title: string; traits: Trait[]; onAddTrait: (trait: Trait) => void; selectedTraits: Trait[] }> = ({ title, traits, onAddTrait, selectedTraits }) => {
    if (traits.length === 0) return null;
    
    return (
        <div>
            <h3 className="text-xl font-bold text-amber-400 mt-6 mb-3 border-b border-gray-600 pb-2">{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {traits.map(trait => <TraitCard key={trait.id} trait={trait} onAddTrait={onAddTrait} isAdded={selectedTraits.some(st => st.id === trait.id)} />)}
            </div>
        </div>
    );
};


const TraitLibrary: React.FC<TraitLibraryProps> = ({ allTraits, onAddTrait, selectedTraits }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [phFilter, setPhFilter] = useState<PhFilter>('all');
    const [showCustom, setShowCustom] = useState(false);
    const [customTrait, setCustomTrait] = useState({ name: '', description: '', ph: 1 });

    const filteredTraits = useMemo(() => {
        let traits = allTraits.filter(trait =>
            trait.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            trait.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

        switch (phFilter) {
            case 'advantages':
                return traits.filter(t => t.ph > 0);
            case 'disadvantages':
                return traits.filter(t => t.ph < 0);
            case 'pm1':
                return traits.filter(t => Math.abs(t.ph) === 1);
            case 'pm2':
                return traits.filter(t => Math.abs(t.ph) === 2);
            case 'pm3':
                return traits.filter(t => Math.abs(t.ph) >= 3);
            case 'all':
            default:
                return traits;
        }
    }, [allTraits, searchTerm, phFilter]);

    const handleAddCustomTrait = (e: React.FormEvent) => {
        e.preventDefault();
        if(!customTrait.name || !customTrait.description) return;
        const newTrait: Trait = {
            ...customTrait,
            id: `custom-${Date.now()}`,
            isCustom: true
        };
        onAddTrait(newTrait);
        setCustomTrait({ name: '', description: '', ph: 1 });
        setShowCustom(false);
    }

    const categories = [
        { title: "Ventajas (+3 PH o más)", ph: 3 },
        { title: "Ventajas (+2 PH)", ph: 2 },
        { title: "Ventajas (+1 PH)", ph: 1 },
        { title: "Desventajas (-1 PH)", ph: -1 },
        { title: "Desventajas (-2 PH)", ph: -2 },
        { title: "Desventajas (-3 PH o menos)", ph: -3 },
    ];


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
            
            <div className="flex flex-wrap gap-2 mb-4">
                <FilterButton label="Todos" filterValue="all" currentFilter={phFilter} setFilter={setPhFilter} />
                <FilterButton label="Ventajas" filterValue="advantages" currentFilter={phFilter} setFilter={setPhFilter} />
                <FilterButton label="Desventajas" filterValue="disadvantages" currentFilter={phFilter} setFilter={setPhFilter} />
                <FilterButton label="±1 PH" filterValue="pm1" currentFilter={phFilter} setFilter={setPhFilter} />
                <FilterButton label="±2 PH" filterValue="pm2" currentFilter={phFilter} setFilter={setPhFilter} />
                <FilterButton label="±3+ PH" filterValue="pm3" currentFilter={phFilter} setFilter={setPhFilter} />
            </div>

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
                {categories.map(cat => (
                    <TraitCategory
                        key={cat.ph}
                        title={cat.title}
                        traits={filteredTraits.filter(t => t.ph === cat.ph || (Math.abs(cat.ph) === 3 && Math.abs(t.ph) >= 3 && Math.sign(t.ph) === Math.sign(cat.ph)))}
                        onAddTrait={onAddTrait}
                        selectedTraits={selectedTraits}
                    />
                ))}
                 {filteredTraits.length === 0 && (
                     <p className="text-gray-500 italic text-center pt-8">No hay rasgos que coincidan con los filtros seleccionados.</p>
                )}
            </div>
        </aside>
    );
};

export default TraitLibrary;