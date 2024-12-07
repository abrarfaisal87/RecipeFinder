import React from 'react'
import {AiFillAlert, AiFillHeart, AiOutlineHeart} from 'react-icons/ai';

const RecipeCard = ({recipe,onClick,onFavouriteButtonClick,isFavourite}) => {
  return (
    <div className='recipe-card flex flex-col
     bg-white content-evenly p-4 shadow-2xl 
     cursor-pointer relative gap-4' onClick={onClick}>

        <img src={recipe.image}/>
        <div className="recipe-card-title flex items-center gap-2">
          <span onClick={(e)=>{
            e.stopPropagation()
            onFavouriteButtonClick(recipe)
          }}>
            {isFavourite ? 
            (<AiFillHeart size={25} color="red"/>) : (<AiOutlineHeart size={25}/>)}
            
          </span>
            <h3 className='text-sm m-0 whitespace-nowrap overflow-hidden text-ellipsis'>{recipe.title}</h3>
        </div>
    </div>
  )
}

export default RecipeCard