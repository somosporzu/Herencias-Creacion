import React from 'react';
import { marked } from 'marked';

interface GeneratedDescriptionProps {
  description: string;
  error: string | null;
  isGenerating: boolean;
}

const GeneratedDescription: React.FC<GeneratedDescriptionProps> = ({ description, error, isGenerating }) => {
  if (!description && !error && !isGenerating) {
    return null;
  }

  const renderDescription = () => {
    if (description) {
      const dirtyHtml = marked.parse(description);
      // Using Tailwind's typography plugin classes for styling the markdown
      return <div className="prose prose-invert max-w-none prose-h3:text-amber-300" dangerouslySetInnerHTML={{ __html: dirtyHtml as string }} />;
    }
    return null;
  };

  return (
    <div className="mt-8 bg-gray-800 shadow-2xl rounded-lg p-6">
      <h2 className="text-2xl font-bold text-amber-400 mb-4 border-b-2 border-gray-700 pb-2">Descripción Generada por IA</h2>
      {isGenerating && (
        <div className="flex items-center justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
            <p className="ml-4 text-lg">La IA está forjando la historia de tu Herencia...</p>
        </div>
      )}
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-md" role="alert">
          <strong className="font-bold">¡Error!</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}
      {description && !isGenerating && (
        <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
            {renderDescription()}
        </div>
      )}
    </div>
  );
};

export default GeneratedDescription;
