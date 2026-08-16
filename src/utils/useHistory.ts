import { useState, useCallback } from 'react';

export function useHistory<T>(initialState: T) {
  const [history, setHistory] = useState<T[]>([initialState]);
  const [pointer, setPointer] = useState<number>(0);

  const set = useCallback((newState: T) => {
    setHistory((prev) => {
      const currentHistory = prev.slice(0, pointer + 1);
      return [...currentHistory, newState];
    });
    setPointer((prev) => prev + 1);
  }, [pointer]);

  const undo = useCallback(() => {
    if (pointer > 0) {
      setPointer((prev) => prev - 1);
    }
  }, [pointer]);

  const redo = useCallback(() => {
    if (pointer < history.length - 1) {
      setPointer((prev) => prev + 1);
    }
  }, [pointer, history.length]);

  return {
    state: history[pointer],
    set,
    undo,
    redo,
    canUndo: pointer > 0,
    canRedo: pointer < history.length - 1
  };
}
