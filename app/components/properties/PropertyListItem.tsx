import Image from "next/image";

import { PropertyType } from "./PropertyList";
import { useRouter } from "next/navigation";
import React from "react";

interface PropertyProps {
    property: PropertyType
}

const PropertyListItem: React.FC<PropertyProps> = ({
    property
}) => {
    const router = useRouter();


    return (
        <div
            onClick={() => router.push(`/properties/${property.id}`)}
            className="cursor-pointer"
        >
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <img
                    src={property.image_url}
                    sizes='(max-width:768px) 768px (max-width:1200px): 768px, 768px'
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt="Beach house"
                />
            </div>
            <div className="mt-2">
                <p className="text-lg font-semibold">{property.title}</p>
            </div>
            <div className="mt-2">
                <p className="text-sm text-gray-500"><strong>${property.price_per_night}</strong> per night</p>
            </div>
        </div>
    )
}

export default PropertyListItem;