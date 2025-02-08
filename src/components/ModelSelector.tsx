import React, { useEffect, useRef } from 'react';
import { useModelStore } from '../store/modelStore';
import { fetchAvailableModels } from '../services/modelService';
import style from '../assets/styles/components/modelSelector.module.scss';

const ModelSelector: React.FC = () => {
  const { 
    models, 
    selectedModel, 
    isModelListVisible, 
    setModels, 
    setSelectedModel, 
    toggleModelList,
    hideModelList 
  } = useModelStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const availableModels = await fetchAvailableModels();
        setModels(availableModels);
        if (availableModels.length > 0 && !selectedModel) {
          setSelectedModel(availableModels[0]);
        }
      } catch (error) {
        console.error('Error loading models:', error);
      }
    };

    const baseUrl = import.meta.env.VITE_OPENAI_BASE_URL;
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (baseUrl && apiKey) {
      loadModels();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        hideModelList();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!import.meta.env.VITE_OPENAI_BASE_URL || !import.meta.env.VITE_OPENAI_API_KEY) {
    return <span className={style.modelName}>Models</span>;
  }

  return (
    <div className={style.modelSelector} ref={dropdownRef}>
      <button onClick={toggleModelList} className={style.selectorButton}>
        <span className={style.modelName}>
          {selectedModel ? selectedModel.name : 'Select Model'}
        </span>
      </button>
      
      {isModelListVisible && (
        <div className={style.dropdown}>
          {models.length > 0 ? (
            models.map((model) => (
              <button
                key={model.id}
                className={`${style.modelOption} ${selectedModel?.id === model.id ? style.selected : ''}`}
                onClick={() => {
                  setSelectedModel(model);
                  hideModelList();
                }}
              >
                {model.name}
              </button>
            ))
          ) : (
            <div className={style.noModels}>No models available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModelSelector; 