import React, { useState } from 'react';

const Registro = () => {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  
  const handleRegistro = async (event) => {
    event.preventDefault(); 

    try {
      const response = await fetch('http://localhost:3008/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email }),
      });

      if (!response.ok) {
        throw new Error('Erro ao realizar o registro');
      }

      alert('Usuário registrado com sucesso!');
      setNome(''); 
      setEmail('');
    } catch (error) {
      alert('Ocorreu um erro na aplicação.');
    }
  };

  return (
    <main>
      <h1>Registro de Usuário</h1>
      <form onSubmit={handleRegistro}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </main>
  );
};

export default Registro;
