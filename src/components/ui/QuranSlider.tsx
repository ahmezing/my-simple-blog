'use client';

import React, { useState, useEffect } from 'react';

const verses = [
  '﴿إِنّا أَنزَلناهُ قُرآنًا عَرَبِيًّا لَعَلَّكُم تَعقِلونَ﴾ [يوسف: ٢]',
  '﴿وَلَقَد نَعلَمُ أَنَّهُم يَقولونَ إِنَّما يُعَلِّمُهُ بَشَرٌ لِسانُ الَّذي يُلحِدونَ إِلَيهِ أَعجَمِيٌّ وَهذا لِسانٌ عَرَبِيٌّ مُبينٌ﴾ [النحل: ١٠٣]',
  '﴿وَكَذلِكَ أَنزَلناهُ قُرآنًا عَرَبِيًّا وَصَرَّفنا فيهِ مِنَ الوَعيدِ لَعَلَّهُم يَتَّقونَ أَو يُحدِثُ لَهُم ذِكرًا﴾ [طه: ١١٣]',
  '﴿قُرآنًا عَرَبِيًّا غَيرَ ذي عِوَجٍ لَعَلَّهُم يَتَّقونَ﴾ [الزمر: ٢٨]',
  '﴿وَكَذلِكَ أَوحَينا إِلَيكَ قُرآنًا عَرَبِيًّا لِتُنذِرَ أُمَّ القُرى وَمَن حَولَها وَتُنذِرَ يَومَ الجَمعِ لا رَيبَ فيهِ فَريقٌ فِي الجَنَّةِ وَفَريقٌ فِي السَّعيرِ﴾ [الشورى: ٧]',
  '﴿إِنّا جَعَلناهُ قُرآنًا عَرَبِيًّا لَعَلَّكُم تَعقِلونَ﴾ [الزخرف: ٣]',
];

const QuranSlider = () => {
  const [currentVerse, setCurrentVerse] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentVerse((prev) => (prev + 1) % verses.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentVerse(index);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className="w-full py-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative h-40 sm:h-36 md:h-24 overflow-hidden">
          <div
            className={`absolute w-full transform transition-all duration-500 ease-in-out ${
              isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            <p className="text-xl sm:text-2xl md:text-3xl font-arabic leading-relaxed text-gray-800 text-center px-4">
              {verses[currentVerse]}
            </p>
          </div>
        </div>
        <div className="flex justify-center space-x-2 mt-2">
            {verses.map((_, idx) => (
                <div
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentVerse
                    ? 'bg-primary w-4'
                    : 'bg-secondary w-2'
                }`}
                />
            ))}
        </div>
      </div>
    </div>
  );
};

export default QuranSlider;
