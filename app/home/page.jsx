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

    const fetchCharacters = async (name = "") => {
        setNotFound(false);
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
            setCharacters(response.data.results);
        } catch (error) {
            console.error("Erro ao buscar personagens: ", error);
            setNotFound(true);
            setCharacters([]);
        }
    };

    useEffect(() => {
        fetchCharacters();
    }, []);

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
            <button onClick={() => fetchCharacters(search)} className={styles.searchButton}>
                Buscar
            </button>
            <button onClick={() => fetchCharacters()} className={styles.resetButton}>
                Limpar
            </button>
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