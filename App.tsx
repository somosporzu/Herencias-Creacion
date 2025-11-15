import React, { useState, useMemo, useCallback } from 'react';
import { type Trait, type Herencia } from './types';
import { ALL_TRAITS } from './constants';
import TraitLibrary from './components/TraitLibrary';
import HerenciaBuilder from './components/HerenciaBuilder';
import Header from './components/Header';
import GeneratedDescription from './components/GeneratedDescription';
import { generateHerenciaDescription } from './services/geminiService';

const App: React.FC = () => {
  const [herencia, setHerencia] = useState<Omit<Herencia, 'traits'>>({
    name: '',
    description: '',
    naturaleza: '',
  });
  const [selectedTraits, setSelectedTraits] = useState<Trait[]>([]);
  const [generatedDesc, setGeneratedDesc] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const totalPH = useMemo(() => {
    return selectedTraits.reduce((sum, trait) => sum + trait.ph, 0);
  }, [selectedTraits]);

  const addTrait = useCallback((trait: Trait) => {
    setSelectedTraits((prev) => {
        if(prev.some(t => t.id === trait.id) && !trait.id.startsWith('custom-')) {
            return prev;
        }
        return [...prev, trait];
    });
  }, []);

  const removeTrait = useCallback((traitId: string) => {
    setSelectedTraits((prev) => prev.filter((trait) => trait.id !== traitId));
  }, []);
  
  const handleHerenciaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHerencia(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateDescription = async () => {
    setIsGenerating(true);
    setError(null);
    setGeneratedDesc('');
    try {
      const fullHerencia: Herencia = { ...herencia, traits: selectedTraits };
      const description = await generateHerenciaDescription(fullHerencia);
      setGeneratedDesc(description);
    } catch (err) {
      setError('Failed to generate description. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetBuilder = () => {
    setHerencia({ name: '', description: '', naturaleza: '' });
    setSelectedTraits([]);
    setGeneratedDesc('');
    setError(null);
  };

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
            <input
              type="text"
              name="naturaleza"
              placeholder="Naturaleza Gratuita (ej: Astuto, Robusto)"
              value={herencia.naturaleza}
              onChange={handleHerenciaChange}
              className="bg-gray-700 border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
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
          <TraitLibrary allTraits={ALL_TRAITS} onAddTrait={addTrait} />
          <HerenciaBuilder
            selectedTraits={selectedTraits}
            totalPH={totalPH}
            onRemoveTrait={removeTrait}
            onGenerateDescription={handleGenerateDescription}
            isGenerating={isGenerating}
            canGenerate={!!herencia.name && !!herencia.naturaleza}
            onReset={resetBuilder}
          />
        </main>
        
        <GeneratedDescription 
            description={generatedDesc} 
            error={error} 
            isGenerating={isGenerating}
        />
      </div>
    </div>
  );
};

export default App;
