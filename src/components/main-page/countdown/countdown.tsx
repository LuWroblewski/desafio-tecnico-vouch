'use client';

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import Link from 'next/link';

export default function CountdownTimer() {
  const [seconds, setSeconds] = useState(10);
  const [ended, setEnded] = useState(false);
  const [hasFiredConfetti, setHasFiredConfetti] = useState(false);

  useEffect(() => {
    if (seconds <= 0) {
      setTimeout(() => {
        setEnded(true);
      }, 1050);
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  useEffect(() => {
    if (ended && !hasFiredConfetti) {
      const myConfetti = confetti.create(undefined, { resize: true });

      myConfetti({
        spread: 100,
        particleCount: 100,
        origin: { y: 0.6 },
      });

      setHasFiredConfetti(true);

      setTimeout(() => {
        myConfetti.reset();
      }, 3000);
    }
  }, [ended, hasFiredConfetti]);

  return (
    <div className='flex flex-col items-center space-y-4 mt-10'>
      <div className='grid grid-flow-col gap-5 text-center auto-cols-max'>
        <div className='flex flex-col items-center justify-center space-y-5'>
          <h2 className='text-2xl'>
            Logo será liberado seu acesso ao sistema de <b>To Do List</b>.
          </h2>
          <span className='countdown font-mono text-6xl'>
            <span style={{ '--value': seconds } as React.CSSProperties}>{seconds < 10 ? `0${seconds}` : seconds}</span>
          </span>
        </div>
      </div>

      {ended && (
        <div className='flex flex-col items-center justify-center space-y-5 z-10'>
          <p className='text-red-500 font-semibold text-lg'>Tempo encerrado, acesse aqui 👇🏻 </p>
          <Link href='/toDoList'>
            <button className='btn btn-primary z-50 relative'>Entrar </button>
          </Link>
        </div>
      )}
    </div>
  );
}
