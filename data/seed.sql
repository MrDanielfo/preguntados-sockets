SELECT COUNT(*) FROM questions WHERE id_categoria = 2;
SELECT nombre FROM questions WHERE id_categoria = 6 ORDER BY random() LIMIT 1;

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (6, '¿Quién resultó campeón goleador del Mundial de Futbol Francia 1998?', '[
  {
    "a": "Luis Figo",
    "b": "Zinedine Zidane",
    "c": "Davor Suker",
    "d": "Luis Hernández"
  }]', 'c');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (6, '¿Qué equipo ganó el Super Bowl en 2017?', '[
{
  "a": "Patriotas de Nueva Inglaterra",
  "b": "Packers de Indiana",
  "c": "Broncos de Denver",
  "d": "Acereros de Pittsburgh"
}]', 'a');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (6, '¿Qué países fueron al mundial de Alemania 2006 por parte de Concacaf?', '[
{
  "a": "México, Estados y Costa Rica",
  "b": "México, Estados Unidos y Trinidad y Tobago",
  "c": "México, Honduras y Costa Rica",
  "d": "México, Estados Unidos y Panamá"
}]', 'b');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (6, '¿Quién es el jugador mexicano con más partidos en Selección Mexicana?', '[
{
  "a": "Jorge Campos",
  "b": "Andrés Guardado",
  "c": "Pável Pardo",
  "d": "Claudio Suárez"
}]', 'b');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (6, '¿Qué equipo de la Liga MX descendió en 2015?', '[
{
  "a": "Leones Negros de UDG",
  "b": "Dorados de Sinaloa",
  "c": "Lobos BUAP",
  "d": "Querétaro"
}]', 'a');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (1, '¿Cuál es la capital de Ecuador?', '[
{
  "a": "Guayaquil",
  "b": "Quito",
  "c": "Barcelona",
  "d": "Cuenca"
}]', 'b');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (1, '¿Cuál es la capital de Estonia?', '[
{
  "a": "Tartu",
  "b": "Narva",
  "c": "Elva",
  "d": "Tallin"
}]', 'd');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (1, '¿Cuál es el río más extenso de México?', '[
{
  "a": "Usumacinta",
  "b": "Papaloapan",
  "c": "Bravo",
  "d": "Lerma"
}]', 'c');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (1, '¿Cuál es la capital del estado de Quintana Roo?', '[
{
  "a": "Chetumal",
  "b": "Cancún",
  "c": "Cozumel",
  "d": "Felipe Carrillo Puerto"
}]', 'a');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (1, '¿Cuántos habitantes tiene la ciudad de Barcelona?', '[
{
  "a": "1 813 200 habitantes",
  "b": "1 620 800 habitantes",
  "c": "1 100 430 habitantes",
  "d": "2 005 150 habitantes"
}]', 'b');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (2, '¿Cuál fue el presidente de México durante el sexenio 1964 - 1970?', '[
{
  "a": "Ernesto Zedillo",
  "b": "Gustavo Díaz Ordaz",
  "c": "Adolfo López Mateos",
  "d": "Diego Fernández de Cevallos"
}]', 'b');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (2, '¿En qué año se firmó el tratado Guadalupe-Hidalgo?', '[
{
  "a": "1826",
  "b": "1833",
  "c": "1857",
  "d": "1848"
}]', 'd');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (2, '¿Qué países firmaron el tratado Guadalupe Hidalgo?', '[
{
  "a": "México y Estados Unidos",
  "b": "México y Guatemala",
  "c": "México y Cuba",
  "d": "México y Canadá"
}]', 'a');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (2, '¿Quién era el primer ministro de Gran Bretaña durante la Segunda Guerra Mundial?', '[
{
  "a": "Anthony Eden",
  "b": "Tony Blair",
  "c": "Winston Churchill",
  "d": "Neville Chamberlain"
}]', 'c');


INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (2, '¿Quién fue el principal contrincante de Barack Obama en las elecciones de 2008?', '[
{
  "a": "Al Gore",
  "b": "Mitt Romney",
  "c": "Hillary Clinton",
  "d": "John McCain"
}]', 'd');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (3, '¿Quién obtuvo el premio Nobel de Literatura en 2020?', '[
{
  "a": "Haruki Murakami",
  "b": "Louise Glück",
  "c": "Gunter Grass",
  "d": "Alice Munro"
}]', 'b');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (3, '¿Quién es el autor de la novela llamada Aura?', '[
{
  "a": "José Emilio Pacheco",
  "b": "Carlos Monsiváis",
  "c": "Carlos Fuentes",
  "d": "Alice Munro"
}]', 'c');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (3, '¿Cómo se llama el mural que se encuentra en la cúpula del Hospicio Cabañas en Guadalajara, Jalisco?', '[
{
  "a": "El hombre en llamas",
  "b": "Prometeo",
  "c": "Retrato de la burguesía",
  "d": "El cargador de Flores"
}]', 'a');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (3, '¿Cuál es el nombre del autor del libro La Divina Comedia?', '[
{
  "a": "William Shakespeare",
  "b": "Dante Alighieri",
  "c": "Esquilo",
  "d": "Michel de Montaigne"
}]', 'b');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (3, '¿En qué año se pintó el mural Mujeres de Chilpancingo?', '[
{
  "a": "1970",
  "b": "1947",
  "c": "1957",
  "d": "1960"
}]', 'd');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (5, '¿Cómo se llama el actor que lleva el papel de Joey en la serie Friends?', '[
{
  "a": "Paul Rudd",
  "b": "Matt LeBlanc",
  "c": "Charlie Sheen",
  "d": "Mathew Perry"
}]', 'b');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (5, '¿Cuántas temporadas tuvo la serie Breaking Bad?', '[
{
  "a": "5",
  "b": "6",
  "c": "4",
  "d": "7"
}]', 'a');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (5, '¿Cómo se llama el actor que estelariza las películas de John Wick?', '[
{
  "a": "Will Smith",
  "b": "Denzel Washington",
  "c": "Keanu Reeves",
  "d": "Daniel Craig"
}]', 'c');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (5, '¿Cuál banda es la autora del éxito We Will Rock You?', '[
{
  "a": "Led Zeppelin",
  "b": "Queen",
  "c": "The Ramones",
  "d": "The White Stripes"
}]', 'b');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (5, '¿Cuántos premios Óscar ha ganado Jennifer Lawrence?', '[
{
  "a": "2",
  "b": "3",
  "c": "Ninguno",
  "d": "1"
}]', 'd');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (4, '¿Cuáles son los tres estados del agua?', '[
{
  "a": "Hirviente, helada y tibia",
  "b": "Sólido, líquido y gaseoso",
  "c": "Sólido, tibio y mineral",
  "d": "Mineral, pura y contaminada"
}]', 'b');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (4, '¿Cuál es el símbolo del elemento Plata en la tabla periódica?', '[
{
  "a": "Au",
  "b": "Ag",
  "c": "Na",
  "d": "P"
}]', 'b');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (4, '¿Cuál es el símbolo del elemento Potasio en la tabla periódica?', '[
{
  "a": "Po",
  "b": "Pt",
  "c": "Pb",
  "d": "K"
}]', 'd');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (4, '¿Cómo se llama el matemático que acuñó el término Álgebra?', '[
{
  "a": "Diofanto de Alejandría",
  "b": "Al-Jwarizmi",
  "c": "Celso",
  "d": "Ptolomeo"
}]', 'b');

INSERT INTO questions (id_categoria, nombre, opciones, correcta) VALUES (4, '¿Cuáles son los dos tipos de cargas eléctricas?', '[
{
  "a": "Átomo y Electrón",
  "b": "Protón y Neutrón",
  "c": "Positiva y Negativa",
  "d": "Física y Luminosa"
}]', 'c');



