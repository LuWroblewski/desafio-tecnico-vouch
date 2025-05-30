'use client';

import { useDroppable } from '@dnd-kit/core';

export default function Droppable({
  id,
  title,
  children,
  bg,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  bg: string;
}) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-60 ${bg} p-4 rounded border-2 transition-all ${isOver ? 'border-info' : 'border-transparent'}`}
    >
      <h2 className='font-bold mb-2'>{title}</h2>
      <div className='flex flex-col gap-2'>{children}</div>
    </div>
  );
}
