const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes/routes');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');

// * usando methodOverride com especificação de métodos HTTP
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

// * configuração do motor de templates Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// * configuração de parsing de corpo de requisição
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * middleware para servir arquivos estáticos
app.use(express.static('public'));
app.use(routes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});
