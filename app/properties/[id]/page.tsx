import Image from "next/image";
import Link from "next/link";
import ReservationSidebar from "@/app/components/properties/ReservationSidebar";
import apiService from "@/app/components/services/apiService";

import { getUserId } from "@/app/lib/actions";



const PropertyDetailPage = async ({ params }: { params: { id: string } }) => {

    const { id } = await params;

    const userId = await getUserId()
    const propery = await apiService.get(`/api/properties/${id}`)

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
                <img
                    src={propery.image_url}
                    className="object-cover w-full h-full"
                    alt="Beach house"
                />
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="py-6 pr-6 col-span-3">
                    <h1 className="mb-4 text-4xl">{propery.title}</h1>
                    <span className="mb-5 block text-lg text-gray-500">
                        {propery.guests} guests - {propery.bedrooms} bedrooms - {propery.bathrooms} bathrooms
                    </span>
                    <hr className="h-px border border-gray-300 shadow-xl mt-4" />
                    <Link
                        href={`/landlords/${propery.landlord.id}`}
                        className="py-6 flex items-center space-x-4"
                    >
                        {propery.landlord.avatar_url && (
                            <Image
                                src={propery.landlord.avatar_url}
                                width={50}
                                height={50}
                                className="rounded-full"
                                alt="The user name"
                            />
                        )}
                        <p><strong>{propery.landlord.name}</strong> is your host</p>
                    </Link>
                    <hr className="h-px border border-gray-300 shadow-xl mt-4" />
                    <div className="mt-3 text-lg">
                        {propery.description}
                    </div>

                </div>
                <ReservationSidebar

                    userId={userId}
                    property={propery}
                />
            </div>
        </main>
    )
};

export default PropertyDetailPage;