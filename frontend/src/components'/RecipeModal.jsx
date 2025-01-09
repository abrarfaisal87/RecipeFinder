import React, { useEffect, useState } from 'react'
import { getRecipeSummary } from '../api';

const RecipeModal = ({recipeId,onClose}) => {
  const [recipeSummary,setRecipeSummary] = useState()

  useEffect(()=>{
     const fetchRecipeSummary = async ()=>{
             try {
              const summaryRecipe = await getRecipeSummary(recipeId);
              setRecipeSummary(summaryRecipe)
             } catch (error) {
              console.log(error);
             }
     }
     fetchRecipeSummary();
  },[recipeId]);
   
  if(!recipeSummary){
    return <></>
  }

  return (
    <>
    <div className="overlay fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] z-10"></div>
    <div className="modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 shadow-md">
        <div className="model-content mx-auto bg-white p-4 rounded max-w-lg">
            <div className="modal-header flex flex-row items-center justify-between ">
                <h2 className='text-3xl font-bold mb-2'>{recipeSummary.title}</h2>
                <span className='close-btn' onClick={onClose}>
                    &times;
                </span>
            </div>
            <p dangerouslySetInnerHTML={{__html:recipeSummary?.summary}}></p>
        </div>
    </div>
    </>
  )
}

export default RecipeModal;