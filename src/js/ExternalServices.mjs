const baseURL = "http://server-nodejs.cit.byui.edu:3000/";
async function convertToJson(res) {
  const response = await res.json();
  if (res.ok) {
    return response;
  } else {
    throw {name: 'servicesError', message: response};
  }
}

export default class ExternalServices {
  constructor(category) {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
}