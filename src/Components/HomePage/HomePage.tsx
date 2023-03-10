/* eslint-disable import/prefer-default-export */
import React from 'react';
import { AdScroll } from './AdScroll/Adscroll';

export const HomePage: React.FC = () => (
  <section className='h-full p-4'>
    <h1 className="text-white text-[32px] font-mont font-bold leading-10 mb-[24px]">
      Welcome to Nice Gadgets store!
    </h1>
    <AdScroll />
  </section>
);