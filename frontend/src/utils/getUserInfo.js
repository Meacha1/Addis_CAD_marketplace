import axios from "axios";

const getUserInfoById = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/findByid/${id}/`, {
      headers: {
        Authorization: `JWT ${localStorage.getItem('access')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getUserInfoById };
