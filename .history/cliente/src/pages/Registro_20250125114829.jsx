import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registrar() {

  const [nome, setNome] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [collection, setCollection] = useState('');
  const [volume, setVolume] = useState('');
  

  const navigation = useNavigate()

  const registrarEsmalte = async(event) => {
    event.preventDefault();
  try{
    const resposta = await fetch('http://localhost:3000/usuarios', {
      method : 'POST',
      headers: {'Content-type':'Application/json'},
      body: JSON.stringify({
      nome:nome,
      brand:brand,
      color:color,
      type:type,
      price:price,
      collection:collection,
      volume:volume
      })
    });
    if(resposta.ok){
      navigation('/');
    }
  }
  catch{
    alert('Ocorreu um erro no app!')
  }
  }


  return (
    <main>
    <form onSubmit={registrarEsmalte}>
        <input type="text" name="" id="nome" value={nome} 
        onChange={(event) => setNome(event.target.value)} />
        <input type="text" id="brand" value={brand}
        onChange={(event) => setBrand(event.target.value)} />
         <input type="text" id="color" value={color}
        onChange={(event) => setColor(event.target.value)} />
         <input type="text" id="type" value={type}
        onChange={(event) => setType(event.target.value)} />
         <input type="text" id="price" value={price}
        onChange={(event) => setPrice(event.target.value)} />
         <input type="text" id="collection" value={collection}
        onChange={(event) => setCollection(event.target.value)} />
         <input type="text" id="volume " value={volume}
        onChange={(event) => setVolume (event.target.value)} />
      <button type="submit">Salvar</button>
    </form>
  </main>
  );
};