import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { type Trait, type Herencia } from './types';
import { ALL_TRAITS, NATURALEZAS } from './constants';
import TraitLibrary from './components/TraitLibrary';
import HerenciaBuilder from './components/HerenciaBuilder';
import Header from './components/Header';

const STORAGE_KEY = 'herenciaCreatorData';

const getInitialState = () => {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            const parsed = JSON.parse(savedData);
            return {
                initialHerencia: parsed.herencia || { name: '', description: '', naturaleza: '' },
                initialTraits: parsed.selectedTraits || [],
            };
        }
    } catch (error) {
        console.error("Error al cargar los datos desde Local Storage:", error);
        localStorage.removeItem(STORAGE_KEY); // Clear corrupted data
    }
    return {
        initialHerencia: { name: '', description: '', naturaleza: '' },
        initialTraits: [],
    };
};


const App: React.FC = () => {
  const { initialHerencia, initialTraits } = getInitialState();
  const [herencia, setHerencia] = useState<Omit<Herencia, 'traits'>>(initialHerencia);
  const [selectedTraits, setSelectedTraits] = useState<Trait[]>(initialTraits);

  // Auto-save to Local Storage on change
  useEffect(() => {
    const dataToSave = {
        herencia,
        selectedTraits,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [herencia, selectedTraits]);

  const totalPH = useMemo(() => {
    return selectedTraits.reduce((sum, trait) => sum + trait.ph, 0);
  }, [selectedTraits]);

  const addTrait = useCallback((trait: Trait) => {
    setSelectedTraits((prev) => {
        if(prev.some(t => t.id === trait.id) && !trait.isCustom) {
            return prev;
        }
        return [...prev, trait];
    });
  }, []);

  const removeTrait = useCallback((traitId: string) => {
    setSelectedTraits((prev) => prev.filter((trait) => trait.id !== traitId));
  }, []);
  
  const handleHerenciaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setHerencia(prev => ({ ...prev, [name]: value }));
  };

  const resetBuilder = () => {
    setHerencia({ name: '', description: '', naturaleza: '' });
    setSelectedTraits([]);
  };
  
  const loadFromStorage = useCallback(() => {
    const { initialHerencia, initialTraits } = getInitialState();
    setHerencia(initialHerencia);
    setSelectedTraits(initialTraits);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <Header />

        <div className="bg-gray-800 shadow-2xl rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-bold text-amber-400 mb-4 border-b-2 border-gray-700 pb-2">Detalles de la Herencia</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Nombre de la Herencia"
              value={herencia.name}
              onChange={handleHerenciaChange}
              className="bg-gray-700 border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
            <select
              name="naturaleza"
              value={herencia.naturaleza}
              onChange={handleHerenciaChange}
              className="bg-gray-700 border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              <option value="">Elige una Naturaleza Gratuita</option>
              {NATURALEZAS.map(nat => (
                <option key={nat} value={nat}>{nat}</option>
              ))}
            </select>
            <textarea
              name="description"
              placeholder="Breve descripción o concepto de la Herencia."
              value={herencia.description}
              onChange={handleHerenciaChange}
              rows={3}
              className="md:col-span-2 bg-gray-700 border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TraitLibrary allTraits={ALL_TRAITS} onAddTrait={addTrait} selectedTraits={selectedTraits} />
          <HerenciaBuilder
            herencia={herencia}
            selectedTraits={selectedTraits}
            totalPH={totalPH}
            onRemoveTrait={removeTrait}
            onReset={resetBuilder}
            onLoadFromStorage={loadFromStorage}
          />
        </main>
      </div>
    </div>
  );
};

export default App;