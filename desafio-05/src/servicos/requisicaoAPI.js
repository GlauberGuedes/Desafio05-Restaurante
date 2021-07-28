const baseURL = "http://localhost:8000/";

export async function post (endPoint, data, token) {
  const headers = {
    'Content-type': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`; 
  }

  try{
    const resposta = await fetch(baseURL+endPoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers
    });

    const dados = await resposta.json();

    return { dados, erro:!resposta.ok }
  }catch(error) {
    throw error.message;
  }
}