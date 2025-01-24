import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function Alterar() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [color, setColor] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const navigate = useNavigate();

    

        useEffect(() => {
            const buscarEsmalte = async()=>{
                const resposta = await fetch('http://localhost:3000/esmaltes/'+ id );
                const dados = await resposta.json();
                setName(dados.name);
                setBrand(dados.brand);
                setColor(dados.color);
                setType(dados.type);
                setPrice(dados.price);
                setStock(dados.stock);
            }
            buscarEsmalte();
        }, [id]);
    

        const alterarEsmalte = async (event) => {
            event.preventDefault();
            try {
              await fetch(`http://localhost:3000/esmaltes/` + id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    name: name,
                    brand:brand, 
                    color:color, 
                    type:type,
                    price: price,
                    stock:stock
                }),
              });
              navigation('/');
            }catch{
                alert('Erro ao alterar');
            }
        }
               

        return (
            <form onSubmit={alterarEsmalte}>
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
              <button type="submit">Salvar Alterações</button>
            </form>
          );
        }






    
    