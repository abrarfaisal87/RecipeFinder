
export const searchRecipes = async (searchTerm,page)=>{
    const baseUrl = new URL('http://localhost:5000/api/recipes/search');
    baseUrl.searchParams.append("searchTerm",searchTerm);
    baseUrl.searchParams.append("page",page);

    const response = await fetch(baseUrl);
    if(!response.ok){
        throw new Error(`http error status: ${response.status}`);
        
    }
    return response.json();
}

export const getRecipeSummary =async (recipeId)=>{
    const baseUrl = new URL(`http://localhost:5000/api/recipes/${recipeId}/summary`);
    const response =await  fetch(baseUrl);
    if(!response.ok){
        throw new Error(`http error status: ${response.status}`);
        
    }
    return response.json();
}

export const getFavouriteRecipes = async()=>{
    const url = new URL("http://localhost:5000/api/recipes/favourite");
    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`http error status: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
        console.error("Unexpected response format:", data);
        return [];
    }

    return data;
    //return response.json();

}

export const addFavouriteRecipe =async (recipe)=>{
    const url = new URL("http://localhost:5000/api/recipes/favourite")
    const body = {
        recipeId : recipe.id
    }

    const response = await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(body)
    })
    if(!response.ok){
        throw new Error(`http error status: ${response.status}`);
    }
}

export const removeFavouriteRecipe = async (recipe)=>{
    const url = new URL("http://localhost:5000/api/recipes/favourite")
    const body = {
        recipeId : recipe.id
    }

    const response = await fetch(url,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(body)
    })
    if(!response.ok){
        throw new Error(`http error status: ${response.status}`)}

}