import axios from "axios"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "8e2375c8-6720-4c71-bea8-6e5273ff80ea",
  },
})
