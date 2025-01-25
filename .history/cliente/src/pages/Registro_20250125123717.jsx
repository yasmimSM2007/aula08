import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registrar() {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [collection, setCollection] = useState('');
  const [volume, setVolume] = useState('');

  const navigation = useNavigate();

  const registrarEsmalte = async (event) => {
    event.preventDefault();
    try {
      const resposta = await fetch('http://localhost:3000/esmaltes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          brand: brand,
          color: color,
          type: type,
          price: parseFloat(price), // Convertendo preço para número
          collection: collection,
          volume: volume,
        }),
      });
      if (resposta.ok) {
        navigation('/');
      } else {
        alert('Erro ao registrar esmalte. Tente novamente!');
      }
    } catch {
      alert('Ocorreu um erro no app!');
    }
  };

  return (
    <main>
      <form onSubmit={registrarEsmalte}>
        <label>
          Nome:
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Marca:
          <input
            type="text"
            id="brand"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Cor:
          <input
            type="text"
            id="color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Tipo:
          <input
            type="text"
            id="type"
            value={type}
            onChange={(event) => setType(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Preço:
          <input
            type="number"
            id="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Coleção:
          <input
            type="text"
            id="collection"
            value={collection}
            onChange={(event) => setCollection(event.target.value)}
          />
        </label>
        <br />
        <label>
          Volume:
          <input
            type="text"
            id="volume"
            value={volume}
            onChange={(event) => setVolume(event.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Salvar</button>
      </form>
    </main>
  );
}
