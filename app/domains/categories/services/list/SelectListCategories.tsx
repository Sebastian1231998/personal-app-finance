import React from 'react'
import { useCategories } from '../../queries/get';
import ErrorMessage from '~/shared/errors/ErrorMessage';

interface SelectCategoryProps{
   onChange?: Function
}
const SelectCategory: React.FC<SelectCategoryProps> = ({onChange}) => {

  const {data, error, isLoading} = useCategories()

  const categories = data?.data

   if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <div className="h-10 w-full bg-gray-300 rounded animate-pulse"></div>
      </div>
    );
  }

  if(error){
    <ErrorMessage message='No se pudo cargar las categorias' />
  }
  return (
    <select
      className="input"
      name='categories'
      required
      onChange={(e) => {if(onChange) onChange(e)}}
    >
       <option key={"black"} value={""}>
            -- Elige una categoria --
        </option>
      {categories?.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  );
};

export default SelectCategory;