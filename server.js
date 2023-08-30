const express = require('express');
const next = require('next');
const base64Img = require('base64-img');
const formidable = require('formidable');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/', (req, res) => {
    return app.render(req, res, '/', req.query);
  });

  server.post('/submit', (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error while processing the upload.');
        return;
      }

      const newImages = [];
      const now = new Date().getTime().toString();

      if (files.images) {
        const images = Array.isArray(files.images) ? files.images : [files.images];
        
        images.forEach((image, index) => {
          const imageData = fs.readFileSync(image.path, 'base64');
          const filename = 'uploads/' + now + '_' + (index + 1) + '.jpg';
          
          base64Img.imgSync('data:image/jpeg;base64,' + imageData, 'public', filename);

          newImages.push(filename);
        });
      }

      return app.render(req, res, '/received', { images: newImages });
    });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
