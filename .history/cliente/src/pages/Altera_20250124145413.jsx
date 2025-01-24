import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function Alterar() {
    const { id } = useParams(); // Obtém o ID do usuário via parâmetro da rota
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [usuarios, setUsuarios] = useState([]); // Estado para a lista de usuários
    const navigation = useNavigate();

    // Busca os dados do usuário para edição
    useEffect(() => {
        const buscaUsuario = async () => {
            try {
                const resposta = await fetch(`http://localhost:3000/usuarios/${id}`);
                if (!resposta.ok) {
                    throw new Error("Erro ao buscar usuário");
                }
                const dados = await resposta.json();
                setNome(dados.nome);
                setEmail(dados.email);
            } catch (error) {
                console.error("Erro na busca do usuário:", error);
            }
        };
        buscaUsuario();
    }, [id]);

    // Busca a lista de usuários para exibição na tabela
    useEffect(() => {
        const buscarUsuarios = async () => {
            try {
                const resposta = await fetch('http://localhost:3000/usuarios');
                if (!resposta.ok) {
                    throw new Error("Erro ao buscar lista de usuários");
                }
                const dados = await resposta.json();
                setUsuarios(dados);
            } catch (error) {
                console.error("Erro ao carregar usuários:", error);
            }
        };
        buscarUsuarios();
    }, []);

    // Função para atualizar os dados do usuário
    const alterar = async (event) => {
        event.preventDefault();
        try {
            const resposta = await fetch(`http://localhost:3000/usuarios/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email }),
            });
            if (!resposta.ok) {
                throw new Error("Erro ao alterar usuário");
            }
            alert('Usuário alterado com sucesso!');
            navigation('/'); // Redireciona para a página inicial após a alteração
        } catch (error) {
            console.error("Erro ao alterar:", error);
            alert('Erro ao alterar o usuário.');
        }
    };

    // Função para remover um usuário
    const removerPessoa = async (usuarioId) => {
        try {
            const resposta = await fetch(`http://localhost:3000/usuarios/${usuarioId}`, {
                method: 'DELETE',
            });
            if (!resposta.ok) {
                throw new Error("Erro ao remover usuário");
            }
            setUsuarios(usuarios.filter(usuario => usuario.id !== usuarioId));
            alert('Usuário removido com sucesso!');
        } catch (error) {
            console.error("Erro ao remover usuário:", error);
            alert('Erro ao remover o usuário.');
        }
    };

    // Função para exportar a tabela como PDF
    const exportarPDF = () => {
        alert("Função para exportar PDF ainda não implementada.");
        // Aqui você pode implementar a lógica de geração de PDF
    };

    return (
        <div>
            {/* Formulário para edição */}
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
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Salvar Alterações</button>
            </form>
        </div>
    );
}
