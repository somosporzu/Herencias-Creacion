import { GoogleGenAI } from "@google/genai";
import { type Herencia, type Trait } from '../types';

if (!process.env.API_KEY) {
  // This provides a helpful error in the console if the API key is missing.
  console.error("API_KEY environment variable not set. Please follow the setup instructions.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function formatTraits(traits: Trait[]): string {
    const ventajas = traits.filter(t => t.ph > 0);
    const desventajas = traits.filter(t => t.ph < 0);

    let formatted = '';

    if (ventajas.length > 0) {
        formatted += '### Ventajas\n';
        ventajas.forEach(v => {
            formatted += `- **${v.name} (${v.ph > 0 ? '+' : ''}${v.ph} PH):** ${v.description}\n`;
        });
    }

    if (desventajas.length > 0) {
        formatted += '\n### Desventajas\n';
        desventajas.forEach(d => {
            formatted += `- **${d.name} (${d.ph} PH):** ${d.description}\n`;
        });
    }

    return formatted;
}


export async function generateHerenciaDescription(herencia: Herencia): Promise<string> {
  const model = "gemini-2.5-flash";
  const prompt = `
    Eres un diseñador de juegos de rol experto, especializado en la creación de trasfondos e historias para razas y linajes de fantasía.
    Basado en la siguiente "Herencia" para el juego de rol "Sistema Papa2", escribe una descripción rica y evocadora.

    **Reglas de la descripción:**
    1.  **Tono:** Fantasía épica pero personal, centrándote en cómo se sienten y viven los miembros de esta herencia.
    2.  **Contenido:** Describe su apariencia general, su psicología, su cultura, cómo se integran (o no) en el mundo, y cómo sus rasgos mecánicos (ventajas y desventajas) se manifiestan en su día a día.
    3.  **Formato:** Usa Markdown. Organiza la descripción en secciones claras como "Apariencia", "Psicología", "Cultura", y "Relaciones con otras Herencias".
    4.  **Inspiración:** Usa el nombre, la naturaleza, la descripción base y la lista de rasgos como la principal fuente de inspiración para tejer una narrativa coherente y fascinante.

    ---

    ## Detalles de la Herencia a Describir

    **Nombre:** ${herencia.name}
    **Naturaleza Gratuita:** ${herencia.naturaleza}
    **Concepto Inicial:** ${herencia.description || 'No especificado.'}

    **Rasgos Mecánicos:**
    ${formatTraits(herencia.traits)}
    ---

    Ahora, por favor, genera la descripción detallada de la Herencia en español.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the generative model.");
  }
}
