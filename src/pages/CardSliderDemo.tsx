import React, { useState } from 'react';
import { CardSizeSlider } from '@/components/CardSizeSlider';

const sizeMap = {
  1: 'w-32',
  2: 'w-44',
  3: 'w-60',
  4: 'w-72',
  5: 'w-96',
};

export default function CardSliderDemo() {
  const [size, setSize] = useState(3);

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-8">
      <CardSizeSlider value={size} onChange={setSize} />
      <div className={`h-40 ${sizeMap[size]} bg-blue-200 rounded-xl flex items-center justify-center transition-all duration-300 shadow`}>
        <span className="text-lg font-bold text-blue-900">Card tamanho {size}</span>
      </div>
    </div>
  );
} 