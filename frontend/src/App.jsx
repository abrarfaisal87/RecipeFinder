import React, { useEffect, useRef } from "react"
import './App.css'
import { useState } from "react";
import * as api from './api';
import RecipeCard from "./components/RecipeCard.jsx";
import RecipeModal from "./components/RecipeModal.jsx";
import { AiOutlineSearch } from "react-icons/ai";


const App = ()=>{
  const [searchTerm,setSearchTerm] = useState(" ");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe,setSelectedRecipe] = useState(undefined);
  const [selectedTab,setSelectedTab] = useState("search");
  const [favouriteRecipes,setFavouriteRecipes]= useState([]);
  const pageNumber = useRef(1);


  useEffect(()=>{
     const fetchFavouriteRecipes = async ()=>{
      try {
        const favouriteRecipes = await api.getFavouriteRecipes();
        setFavouriteRecipes(favouriteRecipes);
      } catch (error) {
        console.log(error)
      }
     }
     fetchFavouriteRecipes();
  },[])
  

  const handleSearchSubmit =async (event)=>{
    event.preventDefault();
   try {
    const recipes = await api.searchRecipes(searchTerm,1);
    setRecipes(recipes.results);
    pageNumber.current = 1;
   } catch (e) {
    console.log(e);
   }
  }
  const handleViewMore =async ()=>{
    const nextPage = pageNumber.current + 1;
    try {
      const nextRecipes = await api.searchRecipes(searchTerm,nextPage)
      setRecipes([...recipes,...nextRecipes.results]);
      pageNumber.current = nextPage;
    } catch (error) {
      console.log(error);
    }
  }

  const addFavouriteRecipe = async (recipe)=>{
       try {
        await api.addFavouriteRecipe(recipe);
        setFavouriteRecipes([...favouriteRecipes,recipe])
       } catch (error) {
        console.log(error);
       }
  }

  const removeFavouriteRecipe = async (recipe)=>{
    try {
      await api.removeFavouriteRecipe(recipe);
      const updatedRecipes = favouriteRecipes.filter(
        (favRecipe)=>recipe.id !== favRecipe.id
      );

      setFavouriteRecipes(updatedRecipes);
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <>
    <div className="app-container flex flex-col gap-8 mx-2 md:mx-40  ">
      <div className="header relative">
        <img className="w-full h-[300px] object-cover object-center opacity-80 rounded-2xl" src="/cover.jpg" alt="" />
        <div className="title 
        absolute top-1/2 left-1/2
         transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl
         text-center bg-black opacity-65 pt-2 pr-5 pb-2 pl-5 rounded-lg">Recipe Finder</div>
      </div>
    <div className="tabs flex gap-8 cursor-pointer">
      <h1 className={selectedTab==="search"?"border-b-2 border-solid border-indigo-600":""} onClick={()=>setSelectedTab("search")}>Recipe search</h1>
      <h1 className={selectedTab==="favourites"?"border-b-2 border-solid border-yellow-700":""} onClick={()=>setSelectedTab("favourites")}>Favourites</h1>
    </div>



    {selectedTab === "search" && (<>

      <form className="flex items-center rounded-lg bg-white" onSubmit={(event)=>handleSearchSubmit(event)}>
        <input className="p-2 text-sm flex-1 rounded-lg border-0 focus:outline-none" required type="text" placeholder="search recipes" value={searchTerm}
        onChange={(e)=> setSearchTerm(e.target.value)}/>
        <button className="cursor-pointer p-1 rounded-lg text-xl bg-white hover:bg-slate-200"><AiOutlineSearch size={35}/></button>
      </form>
     

     <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
           {recipes.map((recipe)=>{
      const isFavourite = favouriteRecipes.some(
        (favRecipe)=>recipe.id===favRecipe.id);

       return (
         <RecipeCard key={recipe.id}
           recipe={recipe}
           onClick={() => setSelectedRecipe(recipe)}
           onFavouriteButtonClick={
            isFavourite? removeFavouriteRecipe : addFavouriteRecipe
          }
           isFavourite={isFavourite} />
       );
     })}
     </div>

        
        <button className="text-lg p-2 text-white bg-gray-600 
        hover:bg-white hover:text-gray-600 transition-all duration-200 rounded-md m-auto" onClick={handleViewMore}>view more</button>
    </>)}




    {selectedTab === "favourites" && (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
    {favouriteRecipes.map((recipe)=>(
      <RecipeCard key={recipe.id} recipe={recipe}
      onFavouriteButtonClick={removeFavouriteRecipe}
      onClick={()=>{setSelectedRecipe(recipe)}}
      isFavourite={true}/>
    ))}
    </div>)}

    <div>
        {selectedRecipe? 
        <RecipeModal recipeId={selectedRecipe.id.toString()} onClose={()=>{setSelectedRecipe(undefined)}}/> : null}
    </div>
    </div>
    


    </>
  )
}

export default App
