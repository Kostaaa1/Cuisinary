import axios from "axios";

export const fetchVeggie = async () => {
    const response = await axios.get("/api/getVeggie");
    const data = await response.data;

    const veggie = data.veggie.recipes.sort(() => Math.random() - 0.5);
    return veggie;
};
