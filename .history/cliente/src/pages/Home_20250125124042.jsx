import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function Home() {
  const [esmaltes, setEsmaltes] = useState([]);

  // Função para buscar os esmaltes ao montar o componente
  useEffect(() => {
    const buscarEsmalte = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/esmaltes");
        const dados = await resposta.json();
        setEsmaltes(dados);
      } catch (error) {
        alert("Erro ao carregar os esmaltes. Tente novamente.");
      }
    };
    buscarEsmalte();
  }, []);

  // Função para remover esmalte
  const removerEsmalte = async (id) => {
    try {
      await fetch(`http://localhost:3000/esmaltes/${id}`, {
        method: "DELETE",
      });
      // Atualiza a lista localmente
      setEsmaltes((prevEsmaltes) => prevEsmaltes.filter((esmalte) => esmalte.id !== id));
    } catch {
      alert("Erro ao remover o esmalte.");
    }
  };

  // Função para exportar a lista de esmaltes em PDF
  const exportarPDF = () => {
    const doc = new jsPDF();
    const tabela = esmaltes.map((esmalte) => [
      esmalte.id,
      esmalte.nome,
      esmalte.brand,
      esmalte.color,
      esmalte.type,
      esmalte.price.toFixed(2), // Formata o preço com 2 casas decimais
      esmalte.collection,
      esmalte.volume,
    ]);

    doc.text("Lista de Esmaltes", 10, 10);
    doc.autoTable({
      head: [["ID", "Nome", "Marca", "Cor", "Tipo", "Preço", "Coleção", "Volume"]],
      body: tabela,
    });
    doc.save("esmaltes.pdf");
  };

  return (
    <div style={{ padding: "20px" }}>
      <Button variant="contained" color="primary" onClick={exportarPDF} style={{ marginBottom: "10px" }}>
        Gerar PDF
      </Button>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Marca</th>
            <th>Cor</th>
            <th>Tipo</th>
            <th>Preço</th>
            <th>Coleção</th>
            <th>Volume</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {esmaltes.map((esmalte) => (
            <tr key={esmalte.id}>
              <td>{esmalte.nome}</td>
              <td>{esmalte.brand}</td>
              <td>{esmalte.color}</td>
              <td>{esmalte.type}</td>
              <td>R$ {esmalte.price.toFixed(2)}</td>
              <td>{esmalte.collection}</td>
              <td>{esmalte.volume}</td>
              <td>
                <button
                  onClick={() => removerEsmalte(esmalte.id)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "red",
                  }}
                >
                  <DeleteForeverIcon />
                </button>
                <Link to={`/alterar/${esmalte.id}`}>
                  <Button variant="outlined" color="secondary" size="small" style={{ marginLeft: "5px" }}>
                    Alterar
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
