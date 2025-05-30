'use client';

import { useState } from 'react';

export default function InputTask({
  onAdd,
}: {
  onAdd: (value: string) => void;
}) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (inputValue.trim() === '') return;
    onAdd(inputValue.trim());
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className='flex justify-center w-full items-center '>
      <fieldset className='fieldset  w-5/12 space-y-2'>
        <legend className='fieldset-legend text-xl'>Adicione uma nova tarefa ao seu quadro</legend>
        <input
          type='text'
          className='input w-full input-primary'
          placeholder='Digite o título'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSubmit} className='btn btn-primary btn-soft btn-lg'>
          Enviar
        </button>
      </fieldset>
    </div>
  );
}
