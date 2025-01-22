import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Alterar() {

    const { id } = useParams();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const navigation = useNavigate();

    useEffect(() => {
        const busca = async()=>{
            const resposta = await fetch('http://localhost:3000/usuarios/'+ id );
            const dados = await resposta.json();
            setNome(dados.nome);
            setEmail(dados.email);
        }
        busca();
    } ,[]);

    const alterar = async(event) => {
        event.preventDefault();
        try{
            await fetch('http://localhost:3000/usuarios/'+ id, 
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'Application/json'},
                    body: JSON.stringify({
                        nome: nome,
                        email: email
                    })
                }
            );
            navigation('/');
        }catch{
            alert('Erro ao alterar');
        }
    }
    return (
        <form onSubmit={alterar}>
            <input type="text" value={nome} onChange={(evento)=> setNome(evento.target.value)}/>
            <input type="text" value={email}onChange={(evento)=> setEmail(evento.target.value)}/>
            <button>Alterar</button>
        </form>
    );
}

<tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>
                <button onClick={() => removerPessoa(usuario.id)}>
                     <DeleteIcon/>
                </button>
                <Link to={'/alterar/' + usuario.id}>
                  <button>Alterar</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
