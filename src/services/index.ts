export default async function getProducts() {
  fetch(`${process.env.REACT_APP_API_ENDPOINT}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
  }).then(response => {
    console.log('response');
    console.log(response);
  });
}
