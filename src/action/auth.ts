import axios from "axios";

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
};

export const loginWithPassword = async (email: string, password: string) => {
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
  try {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/route/basicauth?code=S-14.6.4553.195.1740588891&email=${email}&password=${password}`, options);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/route/basicauth?code=S-14.6.4553.195.1740588891&email=${email}&password=${password}`,
      options
    );

    return response
  } catch (error) {
    console.log(error)
  }
}
