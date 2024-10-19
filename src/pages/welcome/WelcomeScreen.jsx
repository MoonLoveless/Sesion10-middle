import React, { useState, useEffect, useRef } from 'react';
import Home from '@/pages/home/Home';

export default function Component() {
  const [isVisible, setIsVisible] = useState(true);
  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);
  const sourceNodeRef = useRef(null);

  useEffect(() => {
    const loadAudio = async () => {
      try {
        console.log("Iniciando carga de audio...");
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        const response = await fetch('/sounds/waves.mp3');
        const arrayBuffer = await response.arrayBuffer();
        audioBufferRef.current = await audioContextRef.current.decodeAudioData(arrayBuffer);
        console.log("Audio cargado exitosamente");
      } catch (error) {
        console.error('Error al cargar el audio:', error);
      }
    };

    loadAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playAudio = () => {
    if (audioContextRef.current && audioBufferRef.current) {
      try {
        console.log("Intentando reproducir audio...");
        sourceNodeRef.current = audioContextRef.current.createBufferSource();
        sourceNodeRef.current.buffer = audioBufferRef.current;
        sourceNodeRef.current.connect(audioContextRef.current.destination);
        sourceNodeRef.current.loop = true; 
        sourceNodeRef.current.start();
        console.log("Audio reproduciendo");
      } catch (error) {
        console.error('Error al reproducir el audio:', error);
      }
    } else {
      console.log("AudioContext o AudioBuffer no están listos");
    }
  };

  const startApp = () => {
    setIsVisible(false);
    if (audioContextRef.current) {
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume().then(() => {
          console.log("AudioContext resumed");
          playAudio();
        });
      } else {
        playAudio();
      }
    }
  };

  return (
    <>
      {isVisible ? (
        <div style={{
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh', 
          backgroundColor: '#282c34', 
          color: 'white', 
          fontSize: '24px'
        }}>
          <p>Bienvenido a la Aplicación</p>
          <button onClick={startApp} style={{
            padding: '10px 20px', 
            fontSize: '18px', 
            cursor: 'pointer',
            marginTop: '20px',
            backgroundColor: '#61dafb',
            border: 'none',
            borderRadius: '5px',
            color: '#282c34'
          }}>
            Comenzar
          </button>
        </div>
      ) : (
        <Home />
      )}
    </>
  );
}
