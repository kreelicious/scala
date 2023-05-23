import { env } from "../config";

function updateOptions(options) {
  const defaults = {
    //mode: 'cors',
    //credentials: 'include',
    // cache: 'no-cache',
    // referrer: 'no-referrer',
    // redirect: 'follow'
  }
  
  const update = { ...options, ...defaults };
  
  update.headers = {
    ...update.headers,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${env('STRAPI_API_KEY')}` 
  };
  
  return update;
}

function secureFetch(path, options) {
  const baseUrl = env('STRAPI_API_URL')
  return new Promise((resolve, reject) => {
    fetch(baseUrl + path, options).then(response => {
      // response only can be ok in range of 2XX
      if (response.ok) {
        //console.log('apiFetch response', response)
        // you can call response.json() here too if you want to return json
        resolve(response);
      } else {
        //handle errors in the way you want to
        switch (response.status) {
          case 403:
            console.log('apiFetch Authentication error');
            break;
          case 404:
            console.log('apiFetch Object not found');
            break;
          case 500:
            console.log('apiFetch Internal server error');
            break;
          default:
            console.log('apiFetch Some error occured');
            break;
        }
        //here you also can thorow custom error too
        reject(response);
      }
    })
    .catch(error => {
      //it will be invoked mostly for network errors
      //do what ever you want to do with error here
      console.log(error);
      reject(error);
    });
  });
}

export default function apiFetch(path, options) {
  return secureFetch(path, updateOptions(options));
}