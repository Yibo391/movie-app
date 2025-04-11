import { Client, Databases, Query } from "appwrite";
const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_ID;
const COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID;


const client = new Client().
    setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
    .setProject(PROJECT_ID); // Your project ID



const database = new Databases(client);

export const updateSearchCount = async(searchItem,movie)=>{
    try{
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [
                Query.equal('searchItem', searchItem)
            ]
        );
        if(result.documents.length>0){
            const doc = result.documents[0];
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,
            })
        }else{
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                'unique()',
                {
                    searchItem: searchItem,
                    count: 1,
                    movie_id: movie.id,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }
            )
        }
    }
    catch(error){
        console.error("Error updating search count:", error);
    }

}
export const getTrendingMovies = async () => {
    try{
        const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
            Query.limit(5),
            Query.orderDesc('count'),
        ])
        return result.documents;
    }
    catch(error){
        console.error("Error getting trending movies:", error);
    }
}