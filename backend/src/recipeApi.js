import express from 'express';
const { query } = express;

import dotenv from 'dotenv';
dotenv.config();


const apiKey = 'b7faeebe10794f6f87b4edf62b32d31a';

export const searchRecipes = async (searchTerm,page)=>{
    if(!apiKey){
        throw new Error("api key not found");
    }
    const url = new URL('https://api.spoonacular.com/recipes/complexSearch');

    const queryParams = {
        apiKey,
        query: searchTerm,
        number : "10",
        offset : (page * 10).toString()
    }
    url.search = new URLSearchParams(queryParams).toString();

    try {
        const searchResponse = await fetch(url);
        if(!searchResponse.ok){
            throw new error(`API error: ${searchResponse.statusText}`);
        }
        const resultJson =  await searchResponse.json();
        return resultJson;
       
    } catch (error) {
       console.log(error);
       throw new Error("failed to fetch recipes")
    }
}

export const searchRecipeSummary =async (recipeId,)=>{
    const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/summary`)
    if(!apiKey){
        throw new Error("api key not found");
    }
    const queryParams = {
        apiKey,
    }
    url.search = new URLSearchParams(queryParams).toString();


    try {
        const searchResponse = await fetch(url);
        if(!searchResponse.ok){
            throw new error(`API error: ${searchResponse.statusText}`);
        }
        const resultJson =  await searchResponse.json();
        return resultJson;
       
    } catch (error) {
       console.log(error);
       throw new Error("failed to fetch recipe summery")
    }

    
}

export const getFavRecipeByIds =  async(ids)=>{
    const url = new URL('https://api.spoonacular.com/recipes/informationBulk');
    if(!apiKey){
        throw new Error("api key not found");
    }
    const queryParams = {
        apiKey,
        ids:ids.join(','),
    }
    url.search = new URLSearchParams(queryParams).toString();

    
    try {
        const searchResponse = await fetch(url);
        if(!searchResponse.ok){
            throw new error(`API error: ${searchResponse.statusText}`);
        }
        const resultJson =  await searchResponse.json();
        return resultJson;
       
    } catch (error) {
       console.log(error);
       throw new Error("failed to fetch recipe summery")
    }
}