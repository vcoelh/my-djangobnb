'use client';

import useSearchModal from "@/app/hooks/useSearchModal";


const SearchFilters = () => {
    const searchModal = useSearchModal();

    return (
        <div
            onClick={() => searchModal.open('location')}
            className="
        /* Altura adaptável e largura máxima controlada */
        h-[56px] lg:h-[66px] 
        w-full max-w-[90%] md:max-w-[600px] mx-auto
        flex flex-row items-center 
        bg-white 
        border-[1px] border-gray-200 
        shadow-sm hover:shadow-md 
        transition-all duration-300 
        rounded-full cursor-pointer
    "
        >
            <div className="flex flex-row items-center w-full overflow-hidden">
                {/* Seção Única: O Que (Exame) */}
                <div className="flex-1 px-6 lg:px-10 flex flex-col justify-center rounded-full hover:bg-gray-50 h-full transition">
                    <p className="text-[10px] lg:text-xs font-bold uppercase tracking-wider text-emerald-900">
                        O que você busca?
                    </p>
                    <p className="text-sm lg:text-base text-gray-500 truncate font-medium">
                        Digite o nome do exame ou procedimento...
                    </p>
                </div>
            </div>

            {/* Botão de Busca Magnificado */}
            <div className="pr-2 lg:pr-3">
                <div className="
            flex items-center justify-center
            bg-emerald-900 
            hover:bg-emerald-800 
            text-white 
            w-10 h-10 lg:w-12 lg:h-12 
            rounded-full 
            transition-all 
            active:scale-90
            shadow-inner
        ">
                    <svg
                        viewBox="0 0 32 32"
                        className="w-4 h-4 lg:w-5 lg:h-5 stroke-[4px] fill-none"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default SearchFilters;