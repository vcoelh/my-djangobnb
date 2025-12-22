'use client'

import Image from "next/image";

import { ChangeEvent, use, useState } from "react";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";
import Categories from "../addproperty/Categories";

import useAddPropertyModal from "../../hooks/useAddPropertyModal";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";

import apiService from "../services/apiService";
import { useRouter } from "next/navigation";

const AddPropertyModal = () => {
    //
    // States
    const [currentStep, setCurrentStep] = useState(1);
    const [dataCategory, setDataCategory] = useState('');
    const [dataTitle, setDataTitle] = useState('');
    const [dataDescription, setDataDescription] = useState('');
    const [dataPrice, setDataPrice] = useState('');
    const [dataBedrooms, setDataBedrooms] = useState('');
    const [dataBathrooms, setDataBathrooms] = useState('');
    const [dataGuests, setDataGuests] = useState('');
    const [dataCountry, setDataCountry] = useState<SelectCountryValue>();
    const [dataImage, setDataImage] = useState<File | null>(null);


    //
    //

    const addPropertymodal = useAddPropertyModal();
    const router = useRouter();

    //
    // Set datas

    const setCategory = (category: string) => {
        setDataCategory(category)
    }

    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const tmpImage = event.target.files[0];

            setDataImage(tmpImage);
        }
    }

    //
    // Submit

    const submitForm = async () => {
        console.log('submitForm!!');

        if (
            dataCategory &&
            dataTitle &&
            dataDescription &&
            dataPrice &&
            dataCountry &&
            dataImage
        ) {
            const formData = new FormData();
            formData.append('category', dataCategory);
            formData.append('title', dataTitle);
            formData.append('description', dataDescription);
            formData.append('price_per_night', dataPrice);
            formData.append('bedrooms', dataBedrooms);
            formData.append('bathrooms', dataBathrooms);
            formData.append('guests', dataGuests);
            formData.append('country', dataCountry.label);
            formData.append('country_code', dataCountry.value);
            formData.append('image', dataImage);

            const response = await apiService.post('/api/properties/create/', formData);

            if (response.success) {
                console.log('SUCCESS');

                router.push('/')

                addPropertymodal.close()
            } else {
                console.log('ERROR')
            }
        }
    }

    //
    //


    const content = (
        <>
            {currentStep == 1 ? (
                <>
                    <h2 className="mb-6 text-2xl">Choose Category</h2>

                    <Categories
                        dataCategory={dataCategory}
                        setCategory={(category) => setCategory(category)}

                    />

                    <CustomButton
                        label="Next"
                        onClick={() => setCurrentStep(2)}
                    />
                </>
            ) : currentStep == 2 ? (
                <>
                    <h2 className="mb-6 text-2xl">Describe your place</h2>

                    <div className="pt-3 pb-6 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Title</label>
                            <input
                                type="text"
                                value={dataTitle}
                                onChange={(e) => setDataTitle(e.target.value)}
                                className="w-full p-4 border border-gray-500 rounded-xl"
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label>Description</label>
                            <textarea
                                value={dataDescription}
                                onChange={(e) => setDataDescription(e.target.value)}
                                className="w-full h-[200px] p-4 border border-gray-500 rounded-xl"
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex flex-row items-center gap-4 w-full">
                        <CustomButton
                            className="bg-black hover:bg-gray-800"
                            label="Previous"
                            onClick={() => setCurrentStep(1)}
                        />

                        <CustomButton
                            label="Next"
                            onClick={() => setCurrentStep(3)}
                        />
                    </div>
                </>
            ) : currentStep == 3 ? (
                <>
                    <h2 className="mb-6 text-2xl">Details</h2>
                    <div className="pt-3 pb-6 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Price per night</label>
                            <input
                                type="number"
                                value={dataPrice}
                                onChange={(e) => setDataPrice(e.target.value)}
                                className="w-full p-4 border border-gray-500 rounded-xl"
                            />

                        </div>
                    </div>
                    <div className="pt-3 pb-6 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Bedrooms</label>
                            <input
                                type="number"
                                value={dataBedrooms}
                                onChange={(e) => setDataBedrooms(e.target.value)}
                                className="w-full p-4 border border-gray-500 rounded-xl"
                            />

                        </div>
                    </div>
                    <div className="pt-3 pb-6 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Bathrooms</label>
                            <input
                                type="number"
                                value={dataBathrooms}
                                onChange={(e) => setDataBathrooms(e.target.value)}
                                className="w-full p-4 border border-gray-500 rounded-xl"
                            />

                        </div>
                    </div>
                    <div className="pt-3 pb-6 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Maximum number of guests</label>
                            <input
                                type="number"
                                value={dataGuests}
                                onChange={(e) => setDataGuests(e.target.value)}
                                className="w-full p-4 border border-gray-500 rounded-xl"
                            />

                        </div>
                    </div>


                    <div className="flex flex-row items-center gap-4 w-full">
                        <CustomButton
                            className="bg-black hover:bg-gray-800"
                            label="Previous"
                            onClick={() => setCurrentStep(2)}
                        />

                        <CustomButton
                            label="Next"
                            onClick={() => setCurrentStep(4)}
                        />
                    </div>
                </>

            ) : currentStep == 4 ? (
                <>
                    <h2 className="mb-6 text-2xl">Location</h2>

                    <div className="pt-3 pb-6 space-y-4">
                        <SelectCountry
                            value={dataCountry}
                            onChange={(value) => setDataCountry(value as SelectCountryValue)}
                        />
                    </div>
                    <div className="flex flex-row items-center gap-4 w-full">
                        <CustomButton
                            className="bg-black hover:bg-gray-800"
                            label="Previous"
                            onClick={() => setCurrentStep(3)}
                        />

                        <CustomButton
                            label="Next"
                            onClick={() => setCurrentStep(5)}
                        />
                    </div>
                </>
            ) : (
                <>
                    <h2 className='mb-6 text-2xl font-bold text-gray-800'>Image</h2>
                    <div className='pt-3 pb-6 space-y-4'>
                        <label
                            className={`
                            flex flex-col items-center justify-center w-full h-64 
                            border-2 border-dashed rounded-xl cursor-pointer 
                            transition-colors duration-300 ease-in-out
                            ${dataImage ? 'bg-white border-green-500' : 'bg-gray-50 border-gray-300 hover:bg-gray-100 hover:border-gray-400'}
                        `}>
                            {dataImage ? (
                                <div className='relative w-full h-full rounded-xl overflow-hidden group'>
                                    <Image
                                        fill
                                        alt="Uploaded image"
                                        src={URL.createObjectURL(dataImage)}
                                        className='object-cover w-full h-full'
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <p className="text-white font-semibold">Alterar imagem</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">Click to send</span>
                                    </p>
                                    <p className="text-xs text-gray-500">SVG, PNG, JPG</p>
                                </div>
                            )}
                            <input
                                type="file"
                                accept='image/*'
                                className="hidden"
                                onChange={setImage}
                            />
                        </label>
                    </div>
                    <div className="flex flex-row items-center gap-4 w-full">
                        <CustomButton
                            className="bg-black hover:bg-gray-800"
                            label="Previous"
                            onClick={() => setCurrentStep(4)}
                        />

                        <CustomButton
                            label="Submit"
                            onClick={submitForm}
                        />
                    </div>

                </>
            )
            }
        </>
    )

    return (
        <>
            <Modal
                isOpen={addPropertymodal.isOpen}
                close={addPropertymodal.close}
                label="Add property"
                content={content}
            />
        </>
    )
}

export default AddPropertyModal;