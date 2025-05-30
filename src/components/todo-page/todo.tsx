'use client';

import InputTask from '@/components/todo-page/inputTask/inputTask';
import { useState } from 'react';
import Appdnd from './kanban/kanban';

export default function TodoPage() {
  const [items, setItems] = useState<string[]>([]);

  const handleAddItem = (newItem: string) => {
    setItems((prev) => [...prev, newItem]);
  };

  return (
    <div className='space-y-5'>
      <InputTask onAdd={handleAddItem} />

      <Appdnd
        items={items}
        onItemProcessed={(processedItems) => setItems((prev) => prev.filter((item) => !processedItems.includes(item)))}
      />
    </div>
  );
}
