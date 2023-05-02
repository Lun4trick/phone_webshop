import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import normalizePath from '../../utils/helpers/normalizePath';

const PathHistory: React.FC = () => {
  const location = useLocation().pathname;
  const splitedPath = location.split('/').slice(1);
  const currentPath = splitedPath.pop()?.replace(/-/g, ' ');
  const normalizedPath = normalizePath(currentPath ?? '');

  return (
    <div className='flex gap-[15px] mb-6'>
      <NavLink
        className='flex justify-center'
        to='/'
      >
        <img
          className='aspect-square w-4 fill-Phone-white'
          src={`${process.env.PUBLIC_URL!}/imgs/Home-ico.svg`}
          alt='Home'
        />
      </NavLink>
      {splitedPath.map(pathElement => (
        <React.Fragment
          key={pathElement}
        >
          <p
            className='text-Icons'
          >
            {'>'}
          </p>
          <NavLink
            className='text-Phone-white capitalize'
            key={pathElement}
            to={`/${pathElement}`}
          >
            {pathElement}
          </NavLink>
        </React.Fragment>
      ))}
      <p className='text-Icons'>
        {'>'}
      </p>
      <p className='text-Secondary line-clamp-1'>
        {normalizedPath}
      </p>
    </div>
  );
};

export default PathHistory;