interface CategoriesProps {
    dataCategory: string;
    setCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
    dataCategory,
    setCategory,
}) => {

    return (
        <>
            <div className="pt-3 cursor-pointer pb-6 flex items-center justify-center space-x-12 w-full">
                <div
                    onClick={() => setCategory('beach')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'beach' ? 'border-gray-800 opacity-100' : 'border-white'} opacity-60 hover:border-gray-700 hover:opacity-100`}
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
                    onClick={() => setCategory('villas')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'villas' ? 'border-gray-800 opacity-100' : 'border-white'} opacity-60 hover:border-gray-700 hover:opacity-100`}
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
                    onClick={() => setCategory('cabins')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'cabins' ? 'border-gray-800 opacity-100' : 'border-white'} opacity-60 hover:border-gray-700 hover:opacity-100`}
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
                    onClick={() => setCategory('tiny_homes')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'tiny_homes' ? 'border-gray-800 opacity-100' : 'border-white'} opacity-60 hover:border-gray-700 hover:opacity-100`}
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
        </>
    )
}

export default Categories;