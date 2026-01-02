'use client';

import { useState } from "react";
import useSearchModal, { SearchQuery } from "../hooks/useSearchModal";


const Categories = () => {
    const searchModal = useSearchModal();
    const [category, setCategory] = useState('');

    const _setCategory = (_category: string) => {
        setCategory(_category);

        const query: SearchQuery = {
            country: '',
            checkIn: undefined,
            checkOut: undefined,
            bedrooms: 0,
            bathrooms: 0,
            guests: 1,
            category: _category,
        }

        searchModal.setQuery(query);
    }

    return (
        <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12 w-full">
            <div
                onClick={() => _setCategory('')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == '' ? 'border-gray-800 opacity-100' : 'border-white'} opacity-60 hover:border-gray-700 hover:opacity-100`}
            >
                <img
                    src={'/category_icons/all.svg'}
                    alt="Category - Beach"
                    width={30}
                    height={30}
                />
                <span className="text-xs">Todos</span>
            </div>
            <div
                onClick={() => _setCategory('beach')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'beach' ? 'border-gray-800 opacity-100' : 'border-white'} opacity-60 hover:border-gray-700 hover:opacity-100`}
            >
                <img
                    src={'/category_icons/flask.svg'}
                    alt="Category - Beach"
                    width={30}
                    height={30}
                />
                <span className="text-xs">Toxicológico</span>
            </div>

            <div
                onClick={() => _setCategory('villas')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'villas' ? 'border-gray-800 opacity-100' : 'border-white'} opacity-60 hover:border-gray-700 hover:opacity-100`}
            >
                <img
                    src={'/category_icons/dna.svg'}
                    alt="Category - Beach"
                    width={30}
                    height={30}
                />
                <span className="text-xs">DNA</span>
            </div>

            <div
                onClick={() => _setCategory('cabins')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'cabins' ? 'border-gray-800 opacity-100' : 'border-white'} opacity-60 hover:border-gray-700 hover:opacity-100`}
            >
                <img
                    src={'/category_icons/users.svg'}
                    alt="Category - Beach"
                    width={30}
                    height={30}
                />
                <span className="text-xs">Paternindade</span>
            </div>

            <div
                onClick={() => _setCategory('tiny_homes')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'tiny_homes' ? 'border-gray-800 opacity-100' : 'border-white'} opacity-60 hover:border-gray-700 hover:opacity-100`}
            >
                <img
                    src={'/category_icons/baby.svg'}
                    alt="Category - Beach"
                    width={30}
                    height={30}
                />
                <span className="text-xs">Sexagem fetal</span>
            </div>
        </div>
    )
}

export default Categories;