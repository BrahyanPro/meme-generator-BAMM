/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from './Button';
import './app.css';

function App() {
  const [upperText, setUpperText] = useState('');
  const [lowerText, setLowerText] = useState('');
  const [memeChoice, setMemeChoice] = useState('');
  const [allOptions, setAllOptions] = useState([]);
  const [imageUrl, setImageUrl] = useState('');

  // Get all templates from the API and save all objects in allOptions array
  const getMemesTemplates = async () => {
    await axios
      .get('https://api.memegen.link/templates')
      .then((response) => {
        setAllOptions(response.data);
      })
      .catch((error) =>
        // handle error
        console.erro(error)
      );
  };

  // Executes getMemesTemplate function on page loading
  useEffect(() => {
    getMemesTemplates();
  });

  const previewMeme = async () => {
    setImageUrl(
      'https://api.memegen.link/images/' +
        memeChoice +
        '/' +
        upperText.replace(/ /g, '-') +
        '/' +
        lowerText.replace(/ /g, '-')
    );
    await axios
      .get(imageUrl)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) =>
        // handle error
        console.error(error)
      );
  };

  async function downloadImage() {
    const image = await fetch(imageUrl);
    const imageBlob = await image.blob();
    const imagePath = URL.createObjectURL(imageBlob);

    const link = document.createElement('a');
    link.href = imagePath;
    link.download = memeChoice + '_' + upperText + '_' + lowerText;
    document.body.appendChild(link); // adds link at the end of the body
    link.click(); // clicks link and downloads
    document.body.removeChild(link); // removes link at the end of the body
  }

  return (
    <>
      <h1 className="title-app">Meme Generator BAMM&copy;</h1>
      <div className="flex">
        <div className="card">
          <div className="form">
            <section className="element">
              <label htmlFor="memeList">Escoja su meme su meme favorito:</label>
              <input
                id="memeList"
                list="memeOptions"
                onChange={(event) => setMemeChoice(event.target.value)}
                className="input"
              />

              <datalist id="memeOptions">
                {allOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </datalist>
              <br />
              <label htmlFor="upperText">Choose the upper text:</label>

              <input
                id="upperText"
                placeholder="Texto arriba"
                onChange={(event) => setUpperText(event.target.value)}
                className="input"
              />
              <br />
              <label htmlFor="lowerText">Choose the lower text:</label>
              <input
                id="lowerText"
                placeholder="Texto Abajo"
                onChange={(event) => setLowerText(event.target.value)}
                className="input"
              />
              <br />
            </section>
            <Button
              onClick={() => previewMeme()}
              text="Vista previa del meme"
            />
            <br />
            <Button onClick={() => downloadImage()} text="Descargar meme" />
          </div>
          <br />
          <br />
          <div className="holi">
            <img alt="" src={imageUrl} width="500px" />
          </div>
          <br />
          <br />
        </div>
      </div>
    </>
  );
}

export default App;
