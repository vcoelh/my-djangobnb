'use client';

import { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem";
import apiService from "../services/apiService";
import is from "date-fns/esm/locale/is/index.js";
import { getAccessToken } from "@/app/lib/actions";



export type PropertyType = {
    id: string;
    title: string;
    image_url: string;
    price_per_night: number;
    is_favorite: boolean;
}

interface PropertyListProps {
    landlord_id?: string | null;
    favorites?: boolean | null;
}


const PropertyList: React.FC<PropertyListProps> = ({
    landlord_id,
    favorites,
}) => {
    const [properties, setProperties] = useState<PropertyType[]>([])

    const markFavorite = (id: string, is_favorite: boolean) => {
        const tmpProporties = properties.map((property: PropertyType) => {
            if (property.id == id) {
                property.is_favorite = is_favorite

                if (is_favorite) {
                    console.log('Added to the list of favorited properties')
                } else {
                    console.log('removed from the list of favorited properties')
                }
            }
            return property;
        })
        setProperties(tmpProporties);
    }

    const getProperties = async () => {
        let url = '/api/properties/';

        if (landlord_id) {
            url += `?landlord_id=${landlord_id}`
        } else if (favorites) {
            url += '?is_favorites=true'
        }

        const accessToken = await getAccessToken();
        let tmpProperties;

        if (accessToken) {
            tmpProperties = await apiService.get(url, accessToken);
        } else {
            tmpProperties = await apiService.get(url);
        }

        setProperties(tmpProperties.data.map((property: PropertyType) => {
            if (tmpProperties.favorites.includes(property.id)) {
                property.is_favorite = true
            } else {
                property.is_favorite = false
            }

            return property
        }));
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
                        markFavorite={(is_favorite: any) => markFavorite(property.id, is_favorite)}
                    />
                )
            })}
        </>
    )
}

export default PropertyList;