import { useEffect, useState } from "react";

export default function Home() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch {
        alert("Ocorreu um erro no app!");
      }
    };
    buscarUsuario();
  }, [usuarios]);

  const removerPessoas = async (id) => {
    try {
      await fetch("http://localhost:3000/usuarios/" + id, {
        method: "DELETE",
      });
      // Atualizar a lista de usuários após a exclusão
      setUsuarios((prevUsuarios) =>
        prevUsuarios.filter((usuario) => usuario.id !== id)
      );
    } catch {
      alert("Ocorreu um erro ao tentar remover o usuário!");
    }
  };

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
          <tr key={usuario.id}>
            <td>{usuario.nome}</td>
            <td>{usuario.email}</td>
            <td>
              <button onClick={() => removerPessoas(usuario.id)}>X</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
