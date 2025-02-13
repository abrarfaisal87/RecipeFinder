const BASE_URL = "https://recipe-finder-eight-navy.vercel.app";


export const searchRecipes = async (searchTerm, page) => {
    const url = new URL(`${BASE_URL}/api/recipes/search`);
    url.searchParams.append("searchTerm", searchTerm);
    url.searchParams.append("page", page);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
    }
    return response.json();
};

export const getRecipeSummary = async (recipeId) => {
    const url = new URL(`${BASE_URL}/api/recipes/${recipeId}/summary`);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
    }
    return response.json();
};

export const getFavouriteRecipes = async () => {
    const url = new URL(`${BASE_URL}/api/recipes/favourite`);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
        console.error("Unexpected response format:", data);
        return [];
    }
    return data;
};

export const addFavouriteRecipe = async (recipe) => {
    const url = new URL(`${BASE_URL}/api/recipes/favourite`);
    const body = { recipeId: recipe.id };
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
    }
};

export const removeFavouriteRecipe = async (recipe) => {
    const url = new URL(`${BASE_URL}/api/recipes/favourite`);
    const body = { recipeId: recipe.id };
    const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
    }
};