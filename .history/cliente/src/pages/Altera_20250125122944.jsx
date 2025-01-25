import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Alterar() {

    const { id } = useParams();

    const [nome, setNome] = useState('');
    const [brand, setBrand] = useState('');
    const [color, setColor] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [collection, setCollection] = useState('');
    const [volume, setVolume] = useState('');
    const navigation = useNavigate();

    useEffect(() => {
        const busca = async()=>{
            const resposta = await fetch('http://localhost:3000/esmaltes/'+ id );
            const dados = await resposta.json();
            setNome(dados.nome);
            setBrand(dados.brand);
            setColor(dados.color);
            setType(dados.type);
            setPrice(dados.price);
            setCollection(dados.collection);
            setVolume(dados.volume);
            
        }
        busca();
    } ,[]);

    const alterar = async(event) => {
        event.preventDefault();
        try{
            await fetch('http://localhost:3000/esmaltes/'+ id, 
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'Application/json'},
                    body: JSON.stringify({
                        
                    })
                }
            );
            navigation('/');
        }catch{
            alert('Erro ao alterar');
        }
    }
    return (
        <div>
            <form onSubmit={alterar}>
                <label>
                    Nome:
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Brand:
                    <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Color:
                    <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Type:
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Price:
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Collection:
                    <input
                        type="text"
                        value={collection}
                        onChange={(e) => setCollection(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Volume:
                    <input
                        type="text"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        required
                    />
                </label>
                <br />
                
                <button type="submit">Salvar Alterações</button>
            </form>
        </div>
    );
}



