import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteForever from "@mui/icons-material/DeleteForever";

export default function Home() {
  const [esmaltes, setEsmaltes] = useState([]);

  useEffect(() => {
    const buscarEsmaltes = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/esmaltes");
        const dados = await resposta.json();
        setEsmaltes(dados);
      } catch {
        alert("Erro ao buscar esmaltes!");
      }
    };
    buscarEsmaltes();
  }, []);

  const removerEsmalte = async (id) => {
    try {
      await fetch(`http://localhost:3000/esmaltes/${id}`, {
        method: "DELETE",
      });
      setEsmaltes(esmaltes.filter((esmalte) => esmalte.id !== id));
    } catch {
      alert("Erro ao remover esmalte!");
    }
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    const tabela = esmaltes.map((esmalte) => [
      esmalte.id,
      esmalte.name,
      esmalte.brand,
      esmalte.color,
      esmalte.type,
      `R$ ${esmalte.price.toFixed(2)}`,
      esmalte.stock,
    ]);
    doc.text("Lista de Esmaltes", 10, 10);
    doc.autoTable({
      head: [["ID", "Nome", "Marca", "Cor", "Tipo", "Preço", "Estoque"]],
      body: tabela,
    });
    doc.save("esmaltes.pdf");
  };

  return (
    <div>
      <Button variant="contained" onClick={exportarPDF}>
        Gerar PDF
      </Button>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Marca</th>
            <th>Cor</th>
            <th>Tipo</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {esmaltes.map((esmalte) => (
            <tr key={esmalte.id}>
              <td>{esmalte.name}</td>
              <td>{esmalte.brand}</td>
              <td>{esmalte.color}</td>
              <td>{esmalte.type}</td>
              <td>R$ {esmalte.price.toFixed(2)}</td>
              <td>{esmalte.stock}</td>
              <td>
                <button onClick={() => removerEsmalte(esmalte.id)}>
                  <DeleteForever />
                </button>
                <Link to={`/alterar/${esmalte.id}`}>
                  <button>Alterar</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
