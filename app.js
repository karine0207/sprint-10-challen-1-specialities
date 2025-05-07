const express = require('express');
const app = express();
const PORT = 3000;

const usersData = require('./userData.js');
const specialties = ['marketing', 'developers', 'QAs', 'ventas'];


app.get('/', (req, res) => {
  res.send(`
    <h1>Ruta principal</h1>
    <nav>
      ${specialties.map(spec => `<a href="/${spec}">${spec}</a>`).join(' | ')}
      <a href="/ruta-que-no-existe">Probar error 404</a>
    </nav>
  `);
});


specialties.forEach(spec => {
  app.get(`/${spec}`, (req, res) => {
    const users = getUsersBySpecialty(spec);
    res.send(generateHTML(spec, users));
  });
});

app.use((req, res) => {
  res.status(404).send(`
    <h1>Error 404 - Página no encontrada</h1>
    <a href="/">Volver al inicio</a>
  `);
});


function getUsersBySpecialty(specialty) {
  return usersData.filter(user => user.specialty === specialty);
}


function generateHTML(specialty, users) {
  const userList = users.map(user => `<li>${user.name}, edad: ${user.age}</li>`).join('');

  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>${specialty}</title>
      </head>
      <body>
        <nav>
          <a href="/">Volver al Home</a>
        </nav>
        <h1>Especialidad: ${specialty}</h1>
        <p>Total: ${users.length} usuarios</p>
        <ul>
          ${userList}
        </ul>
      </body>
    </html>
  `;
}


app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
