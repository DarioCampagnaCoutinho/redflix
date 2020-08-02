import React, {useState, useEffect} from 'react';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';

function CadastroCategoria() {

    const valoresIniciais = {
        titulo: '',
        descricao: '',
        cor: '',
    }

    const { handleChange, values, clearForm } = useForm(valoresIniciais);

    const [categorias, setCategorias] = useState([]);
    

    useEffect(() => {
        if(window.location.href.includes('localhost')) {
          const URL = 'http://localhost:8080/categorias'; 
          fetch(URL)
           .then(async (respostaDoServer) =>{
            if(respostaDoServer.ok) {
              const resposta = await respostaDoServer.json();
              setCategorias(resposta);
              return; 
            }
            throw new Error('Não foi possível pegar os dados');
           })
        }    
      }, []);

    return (
        <PageDefault>

        <h1>Cadastro de Categoria {values.nome}</h1>

        <form onSubmit={function handleSubmit(infosDoEvento){
            infosDoEvento.preventDefault();
            setCategorias([
                ...categorias,
                values
            ]);

            clearForm();
        }}>
        
        {/*
        
          
        */}
        <FormField 
            label="Nome da Categoria"
            type="text"
            name="titulo"
            value={values.nome}
            onChange={handleChange}
        />

        <FormField 
            label="Descrição"
            type="textarea"
            name="descricao"
            value={values.descricao}
            onChange={handleChange}
        />

        <FormField 
            label="Cor"
            type="color"
            name="cor"
            value={values.cor}
            onChange={handleChange}
        />

        
        <button type="submit">
            Cadastrar
        </button>
        </form>

        {categorias.length === 0 && (
        <div>
          {/* Cargando... */}
          Loading...
        </div>
        )}

        <ul>
            {categorias.map((categoria, indice) => {
                return(
                    <li key={`${categoria.titulo}`}>
                            {categoria.titulo}
                    </li>
                );
            })}
        </ul>

        <Link to="/">
            Ir para Home
        </Link>
        </PageDefault>
    );
}

export default CadastroCategoria;