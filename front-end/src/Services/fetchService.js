function ajax(url, requestMethod, jwt, requestBody) {
    const fetchData = {
      headers: {
        "Content-Type": "application/json",
      },
      method: requestMethod,
    };
  
    if (jwt) {
      fetchData.headers.authorization = `Bearer ${jwt}`;
    }
  
    if (requestBody) {
      fetchData.body = JSON.stringify(requestBody);
    }

    return fetch(url, fetchData).then((Response) => {
        if (Response.status === 200) return Response.json();
    });

  //   const data = doFetch(url, fetchData).then((data) => {
  //     return data;
  // });
  // return data;
}

  // async function doFetch(url, fetchData) {
  //   const response = await fetch(url, fetchData);
  //   if (response.status === 200) {
  //     const data = await response.json();
  //     console.log("data = ", data);
  //   }
  // }

export default ajax;