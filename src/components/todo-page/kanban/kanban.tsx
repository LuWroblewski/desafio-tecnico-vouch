'use client';

import { useEffect, useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import DraggableItem from './draggable';
import DroppableColumn from './droppable';
import { v4 as uuidv4 } from 'uuid';

type ColumnType = 'todo' | 'doing' | 'done';

interface Item {
  id: string;
  content: string;
  createdAt: string;
  column: ColumnType;
}

export default function Appdnd({
  items,
  onItemProcessed,
}: {
  items: string[];
  onItemProcessed?: (processedItems: string[]) => void;
}) {
  const [columns, setColumns] = useState<Record<ColumnType, Item[]>>({
    todo: [],
    doing: [],
    done: [],
  });

  const [processed, setProcessed] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('kanban-items');
    if (stored) {
      const savedItems: Item[] = JSON.parse(stored);
      const newColumns: Record<ColumnType, Item[]> = {
        todo: [],
        doing: [],
        done: [],
      };

      for (const item of savedItems) {
        newColumns[item.column].push(item);
      }

      setColumns(newColumns);
    }
  }, []);

  useEffect(() => {
    const existingContents = new Set([...columns.todo, ...columns.doing, ...columns.done].map((item) => item.content));

    const newItems = items
      .filter((content) => !existingContents.has(content))
      .map((content) => ({
        id: uuidv4(),
        content,
        createdAt: new Date().toISOString(),
        column: 'todo' as ColumnType,
      }));

    if (newItems.length === 0) return;

    setColumns((prev) => ({
      ...prev,
      todo: [...prev.todo, ...newItems],
    }));

    setProcessed(newItems.map((item) => item.content));
  }, [items]);

  useEffect(() => {
    const allItems = [...columns.todo, ...columns.doing, ...columns.done];
    localStorage.setItem('kanban-items', JSON.stringify(allItems));
  }, [columns]);

  useEffect(() => {
    if (processed.length > 0) {
      onItemProcessed?.(processed);
      setProcessed([]);
    }
  }, [processed, onItemProcessed]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const sourceCol = getColumnByItemId(active.id as string);
    const targetCol = over.id as ColumnType | 'trash';

    if (!sourceCol) return;

    if (targetCol === 'trash') {
      setColumns((prev) => {
        const newColumns = { ...prev };
        for (const col of Object.keys(newColumns) as ColumnType[]) {
          newColumns[col] = newColumns[col].filter((item) => item.id !== active.id);
        }
        return newColumns;
      });
      return;
    }

    if (sourceCol === targetCol) return;

    const draggedItem = columns[sourceCol].find((item) => item.id === active.id);
    if (!draggedItem) return;

    setColumns((prev) => {
      const updatedItem = { ...draggedItem, column: targetCol as ColumnType };

      return {
        ...prev,
        [sourceCol]: prev[sourceCol].filter((item) => item.id !== active.id),
        [targetCol]: [...prev[targetCol], updatedItem],
      };
    });
  };

  const getColumnByItemId = (id: string): ColumnType | null => {
    for (const key of Object.keys(columns) as ColumnType[]) {
      if (columns[key].some((item) => item.id === id)) return key;
    }
    return null;
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
        {(['todo', 'doing', 'done'] as ColumnType[]).map((columnId) => (
          <DroppableColumn key={columnId} id={columnId} title={columnId.toUpperCase()} bg='bg-info-content'>
            {columns[columnId].map((item) => (
              <DraggableItem key={item.id} id={item.id}>
                {item.content}
              </DraggableItem>
            ))}
          </DroppableColumn>
        ))}
      </div>

      <DroppableColumn id='trash' title='EXCLUIR' bg='bg-red-500 '>
        Arraste aqui para excluir
      </DroppableColumn>
    </DndContext>
  );
}
