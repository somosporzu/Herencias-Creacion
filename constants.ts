import { type Trait } from './types';

export const NATURALEZAS: string[] = [
    "Apasionadamente",
    "Astutamente",
    "Brutalmente",
    "Caóticamente",
    "Carismáticamente",
    "Cautelosamente",
    "Con Optimismo",
    "Curiosamente",
    "Despiadadamente",
    "Elegantemente",
    "Fríamente",
    "Impulsivamente",
    "Inestablemente",
    "Metódicamente",
    "Rápidamente",
    "Silenciosamente",
    "Siniestramente",
    "Tenazmente",
    "Torpemente",
    "Valientemente",
];

const TRAITS_PLUS_1: Trait[] = [
    { id: 'vision-penumbra', name: 'Visión en la Penumbra', description: 'Puedes ver con poca luz.', ph: 1 },
    { id: 'bono-habilidad-menor', name: 'Bono de Habilidad Menor', description: '+1 a una tirada muy específica (ej: trepar, nadar).', ph: 1 },
    { id: 'arma-natural-debil', name: 'Arma Natural Débil', description: 'Garras o colmillos que infligen 1d6-3 de daño.', ph: 1 },
    { id: 'resistencia-climatica', name: 'Resistencia Climática', description: 'Resistes mejor un clima específico (frío o calor).', ph: 1 },
    { id: 'percepcion-aguda', name: 'Percepción Aguda', description: '+1 a las tiradas para notar detalles sutiles.', ph: 1 },
    { id: 'equilibrio-perfecto', name: 'Equilibrio Perfecto', description: 'Tienes ventaja en las tiradas para evitar caerte o ser derribado.', ph: 1 },
    { id: 'pulmones-grandes', name: 'Pulmones Grandes', description: 'Puedes aguantar la respiración el doble de tiempo.', ph: 1 },
    { id: 'orientacion-natural', name: 'Orientación Natural', description: 'Tienes ventaja en las tiradas para no perderte en la naturaleza.', ph: 1 },
    { id: 'estomago-hierro', name: 'Estómago de Hierro', description: 'Tienes ventaja en las salvaciones contra enfermedades por comida.', ph: 1 },
    { id: 'manos-habiles', name: 'Manos Hábiles', description: '+1 a las tiradas de artesanía fina (joyería, relojería, etc.).', ph: 1 },
    { id: 'familiaridad-animal', name: 'Familiaridad Animal', description: '+1 a las tiradas para interactuar con un tipo de animal (lobos, aves, etc.).', ph: 1 },
    { id: 'pies-ligeros', name: 'Pies Ligeros', description: 'Ignoras el terreno difícil causado por vegetación o suelo irregular.', ph: 1 },
    { id: 'voz-resonante', name: 'Voz Resonante', description: 'Tienes ventaja en tiradas para hacerte oír a distancia o en multitudes.', ph: 1 },
    { id: 'duro-de-cabeza', name: 'Duro de Cabeza', description: '+1 a las tiradas para resistir la intimidación.', ph: 1 },
    { id: 'piel-gruesa-menor', name: 'Piel Gruesa Menor', description: 'Ignoras 1 punto de daño de fuentes no metálicas (garras, puños, etc.).', ph: 1 },
];

const TRAITS_MINUS_1: Trait[] = [
    { id: 'vulnerabilidad-climatica', name: 'Vulnerabilidad Climática', description: 'Fatiga más rápida en un clima específico (calor o frío).', ph: -1 },
    { id: 'necesidad-fisica-leve', name: 'Necesidad Física Leve', description: 'Requiere más agua, comida o descanso de lo normal.', ph: -1 },
    { id: 'desventaja-social-menor', name: 'Desventaja Social Menor', description: 'Un aspecto que genera desconfianza (-1 a las primeras impresiones).', ph: -1 },
    { id: 'miedo-instintivo', name: 'Miedo Instintivo', description: 'Debes superar una tirada de Aura para no asustarte ante un animal o fenómeno común.', ph: -1 },
    { id: 'torpeza-especifica', name: 'Torpeza Específica', description: '-1 a todas las tiradas de una habilidad específica (ej: Sigilo).', ph: -1 },
    { id: 'olor-distintivo', name: 'Olor Distintivo', description: 'Tienes desventaja en sigilo contra criaturas con buen olfato.', ph: -1 },
    { id: 'piel-sensible', name: 'Piel Sensible', description: 'Recibes +1 de daño de Fuego o Hielo.', ph: -1 },
    { id: 'voz-debil', name: 'Voz Débil', description: 'Tienes desventaja en tiradas para hacerte oír a distancia o en multitudes.', ph: -1 },
    { id: 'huesos-fragiles', name: 'Huesos Frágiles', description: 'Recibes el doble de daño de las caídas.', ph: -1 },
    { id: 'mala-memoria', name: 'Mala Memoria', description: 'Tienes desventaja para recordar detalles, nombres o hechos históricos.', ph: -1 },
    { id: 'alergia-comun', name: 'Alergia Común', description: 'Eres alérgico a algo común (polen, polvo, un tipo de animal).', ph: -1 },
    { id: 'fobia-comun', name: 'Fobia Común', description: 'Tienes una fobia a algo común (insectos, alturas, espacios cerrados).', ph: -1 },
    { id: 'sin-sentido-orientacion', name: 'Sin Sentido de la Orientación', description: 'Tienes desventaja en las tiradas para no perderte.', ph: -1 },
    { id: 'curiosidad-morbida', name: 'Curiosidad Mórbida', description: 'Debes superar una tirada de Aura (ND 9) para no investigar algo obviamente peligroso.', ph: -1 },
    { id: 'sabor-desagradable', name: 'Sabor Desagradable', description: 'Las bestias prefieren atacarte a ti antes que a otros.', ph: -1 },
    { id: 'condicionado', name: 'Condicionado', description: 'Una de tus ventajas solo funciona en una situación o momento específico (ej: "solo de noche", "solo contra orcos").', ph: -1 },
];

const TRAITS_PLUS_2: Trait[] = [
    { id: 'defensa-natural', name: 'Defensa Natural', description: '+1 estable a la Defensa.', ph: 2 },
    { id: 'naturaleza-adicional', name: 'Naturaleza Adicional', description: 'Ganas una Naturaleza extra a tu elección.', ph: 2 },
    { id: 'arma-natural-potente', name: 'Arma Natural Potente', description: 'Garras o cuernos que infligen 1d6 de daño.', ph: 2 },
    { id: 'sentidos-agudos', name: 'Sentidos Agudos', description: 'Ventaja en todas las tiradas de un sentido (oído, olfato).', ph: 2 },
    { id: 'movimiento-especial', name: 'Movimiento Especial', description: 'Ganas una velocidad de trepar o nadar igual a tu velocidad terrestre.', ph: 2 },
    { id: 'piel-de-piedra', name: 'Piel de Piedra', description: 'Ignoras 1 punto de daño de cualquier fuente.', ph: 2 },
    { id: 'resistencia-a-venenos', name: 'Resistencia a Venenos', description: 'Tienes ventaja en las Tiradas de Salvación contra venenos.', ph: 2 },
    { id: 'acrobata-nato', name: 'Acróbata Nato', description: 'Tienes ventaja en las tiradas de acrobacias y equilibrio.', ph: 2 },
    { id: 'memoria-fotografica', name: 'Memoria Fotográfica', description: 'Recuerdas con perfecta claridad todo lo que ves o lees.', ph: 2 },
    { id: 'empatia-animal', name: 'Empatía Animal', description: 'Puedes comunicarte de forma simple y empática con los animales.', ph: 2 },
    { id: 'garras-retractiles', name: 'Garras Retráctiles', description: 'Posees armas naturales potentes que puedes ocultar.', ph: 2 },
    { id: 'vision-oscuridad', name: 'Visión en la Oscuridad', description: 'Puedes ver en la oscuridad total como si hubiera penumbra.', ph: 2 },
    { id: 'afinidad-elemental-menor', name: 'Afinidad Elemental Menor', description: 'Puedes realizar pequeños trucos con un elemento (encender una vela, enfriar una bebida).', ph: 2 },
    { id: 'resistencia-magica', name: 'Resistencia Mágica', description: 'Tienes ventaja en las salvaciones contra los efectos de Técnicas.', ph: 2 },
    { id: 'paso-ligero-avanzado', name: 'Paso Ligero Avanzado', description: 'Puedes moverte sobre superficies como nieve profunda o barro sin penalización.', ph: 2 },
    { id: 'resistencia-aumentada', name: 'Resistencia Aumentada', description: '+5 a tu Resistencia máxima.', ph: 2 },
];

const TRAITS_MINUS_2: Trait[] = [
    { id: 'resistencia-reducida', name: 'Resistencia Reducida', description: '-2 a tu Resistencia máxima inicial.', ph: -2 },
    { id: 'atributo-reducido', name: 'Atributo Reducido', description: '-1 permanente a un Atributo primario al inicio.', ph: -2 },
    { id: 'fragilidad-fisica', name: 'Fragilidad Física', description: 'Recibes +1 de daño de un tipo específico (ej: Contundente).', ph: -2 },
    { id: 'limitacion-mental', name: 'Limitación Mental', description: 'No puedes mentir, entender metáforas o usar cierto tipo de equipo.', ph: -2 },
    { id: 'sensible-luz-solar', name: 'Sensible a la Luz Solar', description: 'Tienes desventaja en todas tus acciones bajo la luz solar directa.', ph: -2 },
    { id: 'maldicion-menor', name: 'Maldición Menor', description: 'Sufres mala suerte en un área específica (el dinero se te pierde, la comida se agria, etc.).', ph: -2 },
    { id: 'fisico-inusual', name: 'Físico Inusual', description: 'No puedes usar equipo (armas, armaduras) diseñado para humanos sin adaptarlo (coste x2).', ph: -2 },
    { id: 'hemofobia', name: 'Hemofobia', description: 'Debes superar una Salvación de Aura (ND 12) al ver sangre para no quedar Asustado.', ph: -2 },
    { id: 'conexion-empatica', name: 'Conexión Empática', description: 'Sientes el dolor físico de las criaturas a tu alrededor, sufriendo penalizadores si es intenso.', ph: -2 },
    { id: 'sin-sombra', name: 'Sin Sombra', description: 'No proyectas sombra, lo que genera desconfianza y miedo supersticioso.', ph: -2 },
];

const TRAITS_PLUS_3: Trait[] = [
    { id: 'aliento-elemental', name: 'Aliento Elemental', description: '1/día, inflige 1d6 de daño elemental en un área pequeña (Salvación de Destreza ND 12 para mitad de daño).', ph: 3 },
    { id: 'regeneracion-leve', name: 'Regeneración Leve', description: 'Recuperas 3 de Resistencia al final de cada combate.', ph: 3 },
    { id: 'vuelo-limitado', name: 'Vuelo Limitado', description: 'Puedes planear o volar cortas distancias (tu movimiento de vuelo es igual a tu velocidad terrestre, pero caes si terminas tu turno en el aire).', ph: 3 },
    { id: 'sentido-ciego', name: 'Sentido Ciego', description: 'Puedes "ver" sin usar los ojos en un radio de 5m. Eres inmune a la ceguera.', ph: 3 },
    { id: 'inmunidad-enfermedades', name: 'Inmunidad a Enfermedades', description: 'Eres inmune a todas las enfermedades no mágicas.', ph: 3 },
    { id: 'afinidad-con-fuerza', name: 'Afinidad con una Fuerza', description: 'El coste en PX para comprar técnicas de una Fuerza específica se reduce en un 10%.', ph: 3 },
    { id: 'no-necesita-dormir', name: 'No Necesita Dormir', description: 'Solo necesitas 4 horas de meditación o trance para obtener los beneficios de un descanso largo.', ph: 3 },
    { id: 'toque-vampirico-menor', name: 'Toque Vampírico Menor', description: '1/día, al infligir daño con un ataque cuerpo a cuerpo, puedes recuperar una cantidad de Resistencia igual a la mitad del daño infligido.', ph: 3 },
    { id: 'piel-camaleonica', name: 'Piel Camaleónica', description: 'Tienes ventaja en todas las tiradas de sigilo para esconderte.', ph: 3 },
    { id: 'brazos-adicionales', name: 'Brazos Adicionales', description: 'Tienes dos brazos extra más pequeños. Puedes sostener objetos pero no atacar con ellos.', ph: 3 },
    { id: 'cuerpo-elemental', name: 'Cuerpo Elemental', description: 'Parte de tu cuerpo es de un elemento (ej: brazo de piedra), otorgándote un arma natural potente y Resistencia a un tipo de daño.', ph: 3 },
    { id: 'mente-telepatica', name: 'Mente Telepática', description: 'Puedes comunicarte mentalmente con criaturas a 10 metros.', ph: 3 },
    { id: 'resistencia-al-dolor', name: 'Resistencia al Dolor', description: 'No sufres penalizaciones por estar por debajo de la mitad de tu Resistencia.', ph: 3 },
    { id: 'miembros-elasticos', name: 'Miembros Elásticos', description: 'Puedes estirar tus brazos hasta el doble de su longitud, aumentando tu alcance.', ph: 3 },
];

// FIX: Corrected a syntax error from a truncated object at the end of the array.
const TRAITS_MINUS_3: Trait[] = [
    { id: 'metabolismo-exigente', name: 'Metabolismo Exigente', description: 'Requiere el doble de alimento y agua para no sufrir Fatiga.', ph: -3 },
    { id: 'debilidad-elemental-mayor', name: 'Debilidad Elemental Mayor', description: 'Eres Vulnerable (recibes el doble de daño) a un tipo de daño elemental.', ph: -3 },
    { id: 'defecto-fisico-serio', name: 'Defecto Físico Serio', description: 'Empiezas con una desventaja mecánica permanente (cojera, un solo brazo funcional, etc.).', ph: -3 },
    { id: 'sin-voz', name: 'Sin Voz', description: 'No puedes hablar, debes comunicarte por otros medios.', ph: -3 },
    { id: 'no-puede-sanar-naturalmente', name: 'No puede Sanar Naturalmente', description: 'La recuperación de Resistencia por descanso no te afecta. Solo puedes sanar por Técnicas.', ph: -3 },
    { id: 'vulnerable-a-material-comun', name: 'Vulnerable a un Material Común', description: 'Recibes el doble de daño de armas hechas de un material común (hierro, plata, etc.).', ph: -3 },
    { id: 'parasito-interno', name: 'Parásito Interno', description: 'Debes cumplir una condición especial (ej: consumir un material raro) regularmente o sufrirás consecuencias.', ph: -3 },
];

// FIX: Export a combined list of all traits to be used in the application. This resolves the import error in App.tsx.
export const ALL_TRAITS: Trait[] = [
    ...TRAITS_PLUS_1,
    ...TRAITS_MINUS_1,
    ...TRAITS_PLUS_2,
    ...TRAITS_MINUS_2,
    ...TRAITS_PLUS_3,
    ...TRAITS_MINUS_3,
];
