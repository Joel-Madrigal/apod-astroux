// This currently is not working because there is a CORS (Cross-Origin Resource Sharing) policy
// issue with the SpaceX site. We can try using a different site or API. To be continued.

async function getLaunches() {
  const url = "https://spaceflightnow.com/launch-schedule/";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();

    //Just seeing if we fetched poperly
    console.log(json); 
  }
  catch (error) {
    console.error(error.message);
  }
}

