'use client';

import { TypeAnimation } from 'react-type-animation';

const TypeIntro = () => {
  return (
    <TypeAnimation
      className="text-2xl md:text-5xl tracking-widest text-[--basic-text]"
      sequence={[
        500,
        '一名前端开发工程师。',
        1000,
        'A Front-End Developer.',
        1000,
      ]}
      speed={10}
      repeat={Infinity}
    />
  );
};

export default TypeIntro;
