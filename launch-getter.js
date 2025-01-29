// This currently is not working because there is a CORS (Cross-Origin Resource Sharing) policy
// issue with the SpaceX site. We can try using a different site or API. To be continued.

async function getHTML() {
  const url = "https://www.kennedyspacecenter.com/launches-and-events/events-calendar?pageindex=1&categories=Rocket%20Launches";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const page_data = await response.text();
    //Just seeing if we fetched poperly
    return page_data; 
  }
  catch (error) {
    console.error(error.message);
  }
}

async function scrapeLaunches() {
  const to_be_scraped = await getHTML();
  const parser = new DOMParser();
  const html = parser.parseFromString(to_be_scraped, "text/html");
  const parent_element = html.getElementsByClassName('event-category-type violet');
  console.log(parent_element);
}

