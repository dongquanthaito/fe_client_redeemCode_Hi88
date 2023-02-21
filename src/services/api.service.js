export const getCodeClient = (promo_code) => {
  let requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };
  
  return fetch("https://api.f8bet.club/client/get-code?promo_code=" + promo_code, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result
    })
    .catch(error => console.log('error', error));  
}

export const addPointClient = (player_id, promo_code) => {
  let requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };
  
  return fetch("https://api.f8bet.club/client?player_id="+player_id+"&promo_code="+promo_code, requestOptions)
    .then(response => response.json())
    .then(result => {return result})
    .catch(error => console.log('error', error));  
}