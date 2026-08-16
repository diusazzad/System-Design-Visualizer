import { useState, useEffect } from 'react';
import type { Node, Edge } from 'reactflow';

export interface SavedDesign {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  nodes: Node[];
  edges: Edge[];
  thumbnailUrl?: string; // Optional base64 image for the gallery preview
  formState?: any; // To reload into the builder
}

const STORAGE_KEY = 'system_design_visualizer_gallery';

export function useLocalStorageGallery() {
  const [designs, setDesigns] = useState<SavedDesign[]>([]);

  // Load on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setDesigns(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved designs', e);
      }
    }
  }, []);

  const saveToStorage = (newDesigns: SavedDesign[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDesigns));
    setDesigns(newDesigns);
  };

  const saveDesign = (design: Omit<SavedDesign, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => {
    const now = Date.now();
    let updatedDesigns = [...designs];
    
    if (design.id) {
      // Update existing
      updatedDesigns = updatedDesigns.map(d => 
        d.id === design.id ? { ...d, ...design, updatedAt: now } : d
      );
    } else {
      // Create new
      const newDesign: SavedDesign = {
        ...design,
        id: `design_${now}_${Math.random().toString(36).substring(2, 9)}`,
        createdAt: now,
        updatedAt: now,
      };
      updatedDesigns.unshift(newDesign);
    }
    
    saveToStorage(updatedDesigns);
    return updatedDesigns[0]; // Return the saved instance
  };

  const getDesign = (id: string) => {
    return designs.find(d => d.id === id);
  };

  const deleteDesign = (id: string) => {
    const updated = designs.filter(d => d.id !== id);
    saveToStorage(updated);
  };

  const duplicateDesign = (id: string) => {
    const existing = getDesign(id);
    if (!existing) return;

    const duplicate: SavedDesign = {
      ...existing,
      id: `design_${Date.now()}_copy`,
      name: `${existing.name} (Copy)`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    const updated = [duplicate, ...designs];
    saveToStorage(updated);
  };

  return {
    designs,
    saveDesign,
    getDesign,
    deleteDesign,
    duplicateDesign
  };
}
