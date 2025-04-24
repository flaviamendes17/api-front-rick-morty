"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import CharacterCard from "../../components/CharacterCard";
import styles from "./Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    const [search, setSearch] = useState("");
    const [notFound, setNotFound] = useState(false);
    const [characters, setCharacters] = useState([]);
    const [ page, setPage ] = useState(1);
    const [ totalPages, setTotalPages ] = useState(1);

    const fetchCharacters = async (name = "", page = 1) => {
        setNotFound(false);
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`);
            setCharacters(response.data.results);
            setTotalPages(response.data.info.pages); // Atualiza o total de páginas
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("Nenhum personagem encontrado para o nome fornecido.");
                setNotFound(true);
            } else {
                console.error("Erro ao buscar personagens: ", error);
            }
            setCharacters([]);
        }
    };

    useEffect(() => {
        fetchCharacters(search.trim(), page);
    }, [page]);

    useEffect(() => {
        fetchCharacters(search, page);
    }, [search]);

    const handleSearch = () => {
        const name = search.trim();
        setPage(1); 
        fetchCharacters(name,1);
    };

    const handleReset = () => {
        setSearch("");
        setPage(1); 
        fetchCharacters("", 1);
        toast.success("Filtro foi resetado com sucesso!", { position: "top-right" });
    }


    const handleCardClick = (name) => {
        toast.info(`Você clicou no personagem: ${name}`, {
        });
    };

    return (
        <div className={styles.container}>
            <ToastContainer position="top-right" autoClose={7500} theme="light" />
            
            <h1 className={styles.title}>Rick and Morty Characters</h1>
            
            <input type="text" placeholder="Search for a character..." value={search} onChange={(e) => setSearch(e.target.value)}className={styles.searchInput}
            />
            <button onClick={handleSearch} className={styles.searchButton}>
                Buscar
            </button>
            <button onClick={handleReset} className={styles.resetButton}>
                Limpar
            </button>
            <div className={styles.navControls}>
                <p className={styles.pageIndicator}>Página {page}</p> {/* Indicador de página */}
                <button 
                    onClick={() => setPage((p) => Math.max(p - 1, 1))} 
                    disabled={page === 1} 
                    className={styles.buttonNav}
                >
                    Página anterior
                </button>
                <button 
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))} 
                    disabled={page === totalPages} 
                    className={styles.buttonNav}
                >
                    Próxima página
                </button>
            </div>
            <div className={styles.grid}>
                {notFound ? (
                    <p>Personagem não encontrado.</p>
                ) : (
                    characters.map((char) => (
                        <CharacterCard
                            key={char.id}
                            character={char}
                            onClick={() => handleCardClick(char.name)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}