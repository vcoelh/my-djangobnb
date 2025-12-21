'use client';

import { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem";
import apiService from "../services/apiService";
import { TemplateContext } from "next/dist/shared/lib/app-router-context.shared-runtime";


export type PropertyType = {
    id: string;
    title: string;
    image_url: string;
    price_per_night: number;

}


const PropertyList = () => {
    const [properties, setProperties] = useState<PropertyType[]>([])

    const getProperties = async () => {
        const tmpProporties = await apiService.get('/api/properties/');
        setProperties(tmpProporties.data)
    };

    useEffect(() => {
        getProperties();
    }, []);

    return (
        <>
            {properties.map((property) => {
                return (
                    <PropertyListItem
                        key={property.id}
                        property={property}
                    />
                )
            })}
        </>
    )
}

export default PropertyList;