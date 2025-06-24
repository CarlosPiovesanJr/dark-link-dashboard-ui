import * as Slider from '@radix-ui/react-slider';
import React from 'react';

interface CardSizeSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const CardSizeSlider: React.FC<CardSizeSliderProps> = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-[180px]">
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        min={1}
        max={3}
        step={1}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        aria-label="Tamanho do Card"
      >
        <Slider.Track className="bg-muted relative grow rounded-full h-1.5">
          <Slider.Range className="absolute bg-primary rounded-full h-1.5" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-4 h-4 bg-background border-2 border-primary rounded-full shadow transition-all duration-300 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Tamanho do Card"
        />
      </Slider.Root>
      <div className="flex justify-between text-[11px] mt-1 text-muted-foreground">
        <span>Pequeno</span>
        <span>Médio</span>
        <span>Grande</span>
      </div>
    </div>
  );
}; 