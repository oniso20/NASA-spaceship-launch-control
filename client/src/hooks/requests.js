const API_URL = 'http://localhost:8000'

// Load planets and return JSON
async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`)
  return await response.json()
}

//load launches, sort by flight number, and return as JSON
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

// Submit given launch data to launch system
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      //using .stringify we convert our launch object to a string as we need a string at the client side
      body: JSON.stringify(launch),
    });
  } catch(err) {
    return {
      ok: false,
    };
  }
}

// Delete launch with given ID
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "delete",
    });
  } catch(err) {
    console.log(err)
    return {
      ok: false,
    };
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};