import axios from "axios";

import { VocabularyPayload } from "./types";
import { BASE_URl_API, CONFIG_API, API_ROUTES } from "../constants/api";          

export const getAllVocabulary = async () => {
  try {
    const response = await axios.get(
      `${BASE_URl_API}${CONFIG_API}${API_ROUTES.vocabulary}`,
    );

    return response.data.data;
    
  } catch (err) {
    throw err;
  }
}

export const uploadVocabulary = async (payload: VocabularyPayload) => {
  try {
    await axios.post(
      `${BASE_URl_API}${CONFIG_API}${API_ROUTES.vocabulary}`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    )

  } catch (err) {
    throw err;
  }
}

export const updateVocabulary = async (payload: VocabularyPayload, id: string) => {
  try {
    await axios.put(
      `${BASE_URl_API}${CONFIG_API}${API_ROUTES.vocabulary}/${id}`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    )

  } catch (err) {
    throw err;
  } 
}

export const deleteVocabulary = async (id: string) => {
  try {
    await axios.delete(
      `${BASE_URl_API}${CONFIG_API}${API_ROUTES.vocabulary}/${id}`,
    )
    
  } catch (err) {
    throw err;
  }
}
