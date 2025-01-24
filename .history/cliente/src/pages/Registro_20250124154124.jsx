import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registrar() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();

  const registrarEsmalte = async (event) => {
    event.preventDefault();
    try {
      await fetch("http://localhost:3000/esmaltes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, brand, color, type, price, stock }),
      });
      navigate("/");
    } catch {
      alert("Erro ao registrar esmalte!");
    }
  };

  return (
    <form onSubmit={registrarEsmalte}>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Marca"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Cor"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Tipo"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Preço"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Estoque"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        required
      />
      <button type="submit">Registrar</button>
    </form>
  );
}
