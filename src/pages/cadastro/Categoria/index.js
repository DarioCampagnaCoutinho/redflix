import React, {useState, useEffect} from 'react';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';

function CadastroCategoria() {

    const valoresIniciais = {
        nome: '',
        descricao: '',
        cor: '',
    }

    const [categorias, setCategorias] = useState([]);
    
    const [values, setValues] = useState(valoresIniciais);

    function setValue(chave, valor){
        setValues({
            ...values,
            [chave]: valor,
        })
    }

    function handleChange(infosDoEvento){
        setValue(
            infosDoEvento.target.getAttribute('name'),
            infosDoEvento.target.value
        );
    }

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

            setValues(valoresIniciais);
        }}>
        
        {/*
        
          
        */}
        <FormField 
            label="Nome da Categoria"
            type="text"
            name="nome"
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

        {/*
        <div>
            <label>
                Nome da Categoria:
                <input type="text"
                name='nome'
                value={values.nome}
                onChange={handleChange}/>
            </label>
        </div>
        
        <div>
            <label>
                Descrição:
                <textarea type="text"
                value={values.descricao}
                name='descricao'
                onChange={handleChange}/>
            </label>
        </div>

        <div>
            <label>
                Cor:
                <input type="color"
                value={values.cor}
                name='cor'
                onChange={handleChange}/>
            </label>
        </div>
        */}
        <Button>
            Cadastrar
        </Button>
        </form>

        <ul>
            {categorias.map((categoria, indice) => {
                return(
                    <li key={`${categoria.nome}`}>
                            {categoria.nome}
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