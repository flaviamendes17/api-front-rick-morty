"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import CharacterCard from "../../components/CharacterCard"
import styles from "./Home.module.css";


export default function Home(){
    const [characters, setCharacters] = useState([])

    useEffect(() => {
        axios.get('https://rickandmortyapi.com/api/character').then(response => {
            setCharacters(response.data.results)
        })
        .catch ((error) =>{
            console.error('Erro ao buscar personagens: ', error);
        });
    }, []);

    console.log(characters);

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
            {characters.map((char) => (
                <CharacterCard key={char.id} character={char} />
            ))}
        </div>
        </div>
    );
}
