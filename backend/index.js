import dotenv from 'dotenv';
dotenv.config();
import express from "express"
import cors from "cors"
import * as RecipeAPI from './src/recipeApi.js';
import {PrismaClient}  from '@prisma/client';


const port=process.env.PORT || 5000;
const app = express();
const prismaClient = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send('server is running');
})
app.get("/api/recipes/search",async (req,res)=>{
    const searchTerm = req.query.searchTerm;
    const page = parseInt(req.query.page);
    
    try {
        const results = await RecipeAPI.searchRecipes(searchTerm,page);
        return res.json(results);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to retrieve recipes" });
    }
    

})

app.get("/api/recipes/:recipeId/summary",async(req,res)=>{
    const recipeId = req.params.recipeId;
    const results = await RecipeAPI.searchRecipeSummary(recipeId);
    return res.json(results);
})

app.post("/api/recipes/favourite",async(req,res)=>{
    const recipeId = req.body.recipeId;
    try {
        const favouriteRecipe = await prismaClient.favouriteRecipes.create(
            {
                data:{
                    recipeId:recipeId,
                },
            });
        return res.status(201).json(favouriteRecipe);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"oops,something went wrong"})
    }
})

app.get("/api/recipes/favourite",async(req,res)=>{
    try {
        const recipes = await prismaClient.favouriteRecipes.findMany();
        const recipeIds = recipes.map((recipe)=>recipe.recipeId.toString());

        const favourites = await RecipeAPI.getFavRecipeByIds(recipeIds);

        return res.json(favourites);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"oops,something went wrong"})
    }
})

app.delete('/api/recipes/favourite',async(req,res)=>{
    const recipeId = req.body.recipeId;

    try {
        await prismaClient.favouriteRecipes.delete({
            where:{
                recipeId:recipeId
            }
        })

        res.status(204).send()
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"oops,something went wrong"})
    }
})

app.listen(port,()=>{
    console.log(`server running on ${port}`)
    //console.log("API_KEY:", process.env.API_KEY);
})


// ZOXB0S5ZhxWcFyxY

//4els7s8yUj3TYb8u