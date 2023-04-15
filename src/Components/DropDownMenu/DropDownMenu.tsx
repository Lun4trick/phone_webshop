import React, { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { PaginationOptions, SortByTypes, SortMenuType } from '../../utils/types/SortByMenuTypes';
import ItemsPerPage from '../../utils/map/ItemsPerPage';

type MenuType = 'sortMenu' | 'pagMenu';

type Props = {
  onItemsSortChange: (sortMenu: SortMenuType) => void,
}

const DropDownMenu: React.FC<Props> = ({ onItemsSortChange }) => {
  const {NEWEST} = SortByTypes;
  const [currentSort, setCurrentSort] = useState<SortByTypes>(NEWEST);
  const [maxItems, setMaxItems] = useState<PaginationOptions>('16');
  const [{isSortOpen, isPagOpen}, setMenusOpen] = useState({isSortOpen: false, isPagOpen: false});
  const sortTypes = Object.values(SortByTypes);
  const sortMenuRef = useRef<HTMLDivElement | null>(null);
  const pagMenuRef = useRef<HTMLDivElement | null>(null);

  const menuCloseHandler = useCallback((menu: MenuType) => {
    if (menu === 'sortMenu') {
      setMenusOpen(prev => ({ 
        ...prev, 
        isSortOpen: false 
      }))
    } else {
      setMenusOpen(prev => ({ 
        ...prev, 
        isPagOpen: false 
      }))
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', (event) => {
      if (
        sortMenuRef.current 
        && !sortMenuRef.current.contains(event.target as Node)
      ) {
        menuCloseHandler('sortMenu');
      }

      if (
        pagMenuRef.current 
        && !pagMenuRef.current.contains(event.target as Node)
      ) {
        menuCloseHandler('pagMenu')
      }
    });

    return () => {
      document.removeEventListener('mousedown', (event) => {
        if (
          sortMenuRef.current 
          && !sortMenuRef.current.contains(event.target as Node)
        ) {
          menuCloseHandler('sortMenu');
        }
  
        if (
          pagMenuRef.current 
          && !pagMenuRef.current.contains(event.target as Node)
        ) {
          menuCloseHandler('pagMenu')
        }
      })
    }
  }, [])

  useEffect(() => {
    onItemsSortChange({sort: currentSort, pagination: maxItems});
  }, [currentSort, maxItems])
  

  return (
    <div className='flex mb-6 gap-4'>
      <div className='w-[185px]'>
        <p className='text-Secondary text-xs'>
          Sort by
        </p>
        <div 
          ref={sortMenuRef}
          className='flex flex-col'>
          <button 
            type='button'
            className='flex justify-between items-center text-Phone-white bg-Surface-2 text-[14px] text-left py-[10px] px-[12px] mb-1'
            onClick={() => {
              setMenusOpen(prev => ({
                ...prev,
                isSortOpen: !prev.isSortOpen
              }));
            }}
          >
            {currentSort}
            <img 
              className={cn(
                ' transition-all',
                {'rotate-180': isSortOpen}
              )}
              src={`${process.env.PUBLIC_URL}/imgs/arrow-down.svg`} 
              alt="arrow-left" 
            />
          </button>
          <div className='relative'>
            <div 
              className={cn(
                'flex flex-col overflow-hidden absolute w-full bg-opacity-95 z-10 bg-Phone-Black max-h-fit border-[1px] border-Elements',
                {'hidden': !isSortOpen}
              )}
            >
              {(sortTypes).map((sortType) => (
                <button 
                  className='text-Secondary bg-opacity-95 text-[14px] bg-Phone-black text-left py-[10px] pl-[12px] hover:text-Phone-white hover:bg-Surface-2'
                  key={sortType}
                  type='button' 
                  onClick={() => {
                    setCurrentSort(sortType);
                    menuCloseHandler('sortMenu')
                  }}
                >
                  {sortType}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='w-[135px]'>
        <p className='text-Secondary text-xs'>
          Items on page
        </p>
        <div 
          ref={pagMenuRef}
          className='flex flex-col'>
          <button 
            type='button'
            className='flex justify-between items-center text-Phone-white text-[14px] bg-Surface-2 text-left py-[10px] px-[12px] mb-1'
            onClick={() => {
              setMenusOpen(prev => ({
                ...prev,
                isPagOpen: !prev.isPagOpen
              }));
            }}
          >
            {maxItems}
            <img 
              className={cn(
                ' transition-all',
                {'rotate-180': isPagOpen}
              )}
              src={`${process.env.PUBLIC_URL}/imgs/arrow-down.svg`} 
              alt="arrow-left" 
            />
          </button>
          <div className='relative'>
            <div 
              className={cn(
                'flex flex-col overflow-hidden absolute w-full bg-opacity-95 z-10 bg-Phone-Black max-h-fit border-[1px] border-Elements',
                {'hidden': !isPagOpen}
              )}
            >
              {ItemsPerPage.map((itemPerPage) => (
                <button 
                  className='text-Secondary text-[14px] bg-opacity-95 bg-Phone-black text-left py-[10px] pl-[12px] hover:text-Phone-white hover:bg-Surface-2'
                  key={itemPerPage}
                  type='button' 
                  onClick={() => {
                    setMaxItems(itemPerPage);
                    menuCloseHandler('pagMenu')
                  }}
                >
                  {itemPerPage}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>  
  )
};

export default DropDownMenu;
