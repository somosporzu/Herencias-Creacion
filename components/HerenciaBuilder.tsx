import React, { useMemo } from 'react';
import { type Trait, type Herencia } from '../types';

interface HerenciaBuilderProps {
  herencia: Omit<Herencia, 'traits'>;
  selectedTraits: Trait[];
  totalPH: number;
  onRemoveTrait: (traitId: string) => void;
  onReset: () => void;
}

const HerenciaBuilder: React.FC<HerenciaBuilderProps> = ({
  herencia,
  selectedTraits,
  totalPH,
  onRemoveTrait,
  onReset
}) => {
    const validation = useMemo(() => {
        const hasDisadvantage = selectedTraits.some(t => t.ph < 0);
        const traitCount = selectedTraits.length;
        const isBalanced = totalPH === 0;
        const isTraitCountValid = traitCount >= 2 && traitCount <= 5;
        
        return {
            isValid: isBalanced && isTraitCountValid && hasDisadvantage,
            hasDisadvantage,
            isTraitCountValid,
            isBalanced
        };
    }, [selectedTraits, totalPH]);

    const handleExport = () => {
        if (!herencia.name || selectedTraits.length === 0) {
          alert("Por favor, pon un nombre a tu herencia y añade al menos un rasgo antes de exportar.");
          return;
        }
    
        let content = `==============================\n`;
        content += ` Herencia: ${herencia.name}\n`;
        content += `==============================\n\n`;
    
        content += `Naturaleza: ${herencia.naturaleza || 'No especificada'}\n`;
        content += `Descripción: ${herencia.description || 'No especificada'}\n\n`;
        
        content += `--- Rasgos ---\n`;
        selectedTraits.forEach(trait => {
            const phSign = trait.ph > 0 ? '+' : '';
            content += `- ${trait.name} (${phSign}${trait.ph} PH): ${trait.description}\n`;
        });
        content += `\n`;
    
        content += `--- Resumen y Reglas ---\n`;
        content += `Puntos de Herencia (PH) Totales: ${totalPH} (Objetivo: 0)\n`;
        content += `Número de Rasgos: ${selectedTraits.length} (Objetivo: 2-5)\n\n`;
        
        content += `Estado de Validación:\n`;
        content += `- Balance de Puntos: ${validation.isBalanced ? 'CUMPLIDO' : 'NO CUMPLIDO'}\n`;
        content += `- Número de Rasgos: ${validation.isTraitCountValid ? 'CUMPLIDO' : 'NO CUMPLIDO'}\n`;
        content += `- Desventaja Obligatoria: ${validation.hasDisadvantage ? 'CUMPLIDO' : 'NO CUMPLIDO'}\n\n`;

        content += `>> Herencia Válida para Jugar: ${validation.isValid ? 'SÍ' : 'NO'} <<\n`;

        const element = document.createElement("a");
        const file = new Blob([content], {type: 'text/plain;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        const fileName = herencia.name.replace(/ /g, '_').toLowerCase();
        element.download = `herencia_${fileName || 'sin_nombre'}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const phColor = totalPH === 0 ? 'text-green-400' : 'text-red-400';

  return (
    <section className="bg-gray-800 shadow-2xl rounded-lg p-6 flex flex-col">
      <div className="flex justify-between items-center border-b-2 border-gray-700 pb-2 mb-4">
        <h2 className="text-2xl font-bold text-amber-400">Tu Herencia</h2>
        <div className="text-right">
            <span className="text-sm text-gray-400 block">Balance Actual</span>
            <span className={`text-3xl font-black ${phColor}`}>{totalPH} PH</span>
        </div>
      </div>
      
      <div className="flex-grow space-y-2 mb-4 overflow-y-auto max-h-[40vh] pr-2">
        {selectedTraits.length === 0 ? (
          <p className="text-gray-500 italic text-center py-8">Añade rasgos desde la biblioteca para empezar a construir tu Herencia.</p>
        ) : (
          selectedTraits.map((trait) => (
            <div key={trait.id} className="bg-gray-700 p-3 rounded-md flex justify-between items-center">
              <div>
                <p className="font-semibold text-amber-300">{trait.name}</p>
                <p className="text-xs text-gray-400">{trait.description}</p>
              </div>
              <div className="flex items-center space-x-4">
                 <span className={`font-bold text-lg ${trait.ph > 0 ? 'text-green-400' : 'text-red-400'}`}>{trait.ph > 0 ? '+' : ''}{trait.ph}</span>
                 <button onClick={() => onRemoveTrait(trait.id)} className="text-red-500 hover:text-red-400 font-bold text-2xl" aria-label={`Quitar rasgo ${trait.name}`}>&times;</button>
              </div>
            </div>
          ))
        )}
      </div>
      
        <div className="bg-gray-900/50 p-3 rounded-lg mt-auto">
            <h4 className="font-bold mb-2 text-gray-300">Reglas de Construcción</h4>
            <ul className="text-sm space-y-1">
                <li className={`transition-colors ${validation.isBalanced ? 'text-green-400' : 'text-red-400'}`}>
                    <strong>Balance de Puntos:</strong> El total debe ser 0 PH. (Actual: {totalPH})
                </li>
                <li className={`transition-colors ${validation.isTraitCountValid ? 'text-green-400' : 'text-red-400'}`}>
                    <strong>Número de Rasgos:</strong> Entre 2 y 5. (Actual: {selectedTraits.length})
                </li>
                <li className={`transition-colors ${validation.hasDisadvantage ? 'text-green-400' : 'text-red-400'}`}>
                    <strong>Desventaja Obligatoria:</strong> Al menos una.
                </li>
            </ul>
        </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <button
            onClick={handleExport}
            disabled={!herencia.name || selectedTraits.length === 0}
            className="w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
            Exportar como Texto
        </button>
        <button
            onClick={onReset}
            className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
            Reiniciar
        </button>
      </div>
       {!validation.isValid && selectedTraits.length > 0 && <p className="text-xs text-center text-red-400 mt-2">La Herencia no cumple las reglas de construcción.</p>}
    </section>
  );
};

export default HerenciaBuilder;