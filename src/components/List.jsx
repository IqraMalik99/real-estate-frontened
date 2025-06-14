import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function List() {
  const navigate = useNavigate();
  const [loaderz, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      sell: false,
      rent: false,
      parking: false,
      furnished: false,
      offer: false,
    },
  });

  const isRent = watch('rent');
  const isSell = watch('sell');
  const key = Array.from({ length: 11 }, (_, i) => i); // [0-10]

  const submit = async (data) => {
    console.log(data);
    const { files, ...otherData } = data;
    const getFile = files && files.length > 0 ? Array.from(files) : [];

    const formData = new FormData();

    for (let key in otherData) {
      formData.append(key, otherData[key]);
    }

    getFile.forEach((file) => {
      formData.append('imageUrl', file);
    });

    try {
      setLoading(true);
      const response = await axios.post(
        'https://realestae-backened-production.up.railway.app/list/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      console.log('Response from server:', response.data);
      reset();
      navigate('/showlist');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {loaderz ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-16 h-16 border-4 border-t-4 border-black border-t-gray-300 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="text-white">
          <form onSubmit={handleSubmit(submit)}>
            <div className="w-screen overflow-x-hidden text-2xl font-bold text-center my-5">
              CREATE LIST
            </div>

            <div className="w-screen h-full px-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="w-1/2 flex flex-col justify-center gap-3 items-center">
                <Input {...register('name', { required: true })} placeholder="Name..." />
                <Input
                  {...register('detail', { required: true })}
                  placeholder="Description..."
                  type="text"
                />
                <textarea
                  {...register('address', { required: true })}
                  placeholder="Address..."
                  rows="2"
                  cols="50"
                  className="rounded-lg p-2 my-3 bg-white/30 backdrop-blur-lg shadow-md focus:outline-none w-72"
                />

                {/* Checkboxes */}
                <div className="flex gap-4 flex-wrap">
                  <input
                    type="checkbox"
                    id="sell"
                    {...register('sell')}
                    onChange={(e) => {
                      setValue('sell', e.target.checked);
                      setValue('rent', false);
                    }}
                    className="mr-2"
                  />
                  <label htmlFor="sell">Sell</label>

                  <input
                    type="checkbox"
                    id="rent"
                    {...register('rent')}
                    onChange={(e) => {
                      setValue('rent', e.target.checked);
                      setValue('sell', false);
                    }}
                    className="mr-2"
                  />
                  <label htmlFor="rent">Rent</label>

                  <input type="checkbox" id="parking" {...register('parking')} className="mr-2" />
                  <label htmlFor="parking">Parking Spot</label>

                  <input type="checkbox" id="furnished" {...register('furnished')} className="mr-2" />
                  <label htmlFor="furnished">Furnished</label>

                  <input type="checkbox" id="offer" {...register('offer')} className="mr-2" />
                  <label htmlFor="offer">Offer</label>
                </div>

                {/* Select Boxes */}
                <div className="flex gap-9">
                  <div className="flex gap-3">
                    <select
                      id="Beds"
                      {...register('Beds', { required: 'Please select number of bedrooms' })}
                      className="border p-2 rounded bg-black"
                    >
                      <option value="">Select...</option>
                      {key.map((k) => (
                        <option value={k} key={k}>
                          {k}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="Beds" className="font-bold text-lg">
                      Beds
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <select
                      id="Bath"
                      {...register('Bath', { required: 'Please select number of bathrooms' })}
                      className="border p-2 rounded bg-black"
                    >
                      <option value="">Select...</option>
                      {key.map((k) => (
                        <option key={k} value={k}>
                          {k}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="Bath" className="font-bold text-lg">
                      Bath
                    </label>
                  </div>
                </div>

                {/* Amount input */}
                <div className="flex gap-2 items-end">
                  <input
                    type="text"
                    {...register('amount', { required: true })}
                    className="rounded-lg p-2 my-3 h-8 bg-white/30 backdrop-blur-lg shadow-md focus:outline-none w-20"
                  />
                  <p className="pb-5">
                    {isRent
                      ? 'Monthly Rent ($/month)'
                      : isSell
                      ? 'Price for Sale ($)'
                      : 'Amount ($)'}
                  </p>
                </div>
              </div>

              {/* File upload and Submit */}
              <div className="w-1/2 flex flex-col justify-center items-center">
                <input
                  className="rounded-lg p-2 my-3 h-12 bg-white/30 backdrop-blur-lg shadow-md focus:outline-none w-72"
                  type="file"
                  id="file"
                  {...register('files')}
                  multiple
                />
                <button type="submit" className="w-32 h-10 bg-black rounded-lg">
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default List;
