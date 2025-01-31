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
  const parent_div = html.getElementsByClassName("event-calender-container");
  if (parent_div.length > 0) {
    const outer_child = parent_div[0].children;
    const next_child = outer_child[1].children;
    const third_to_last = next_child[0].children;
    const second_to_last = third_to_last[4].children;
    const launch_text = second_to_last[1].innerHTML; 
    

    /*Can't get the last div that contains the launches because there is a '::before' css
    within the parent div that is restricing access to the div I need. Might research for other
    options for launching sites. Hrm... */
  }
  console.log('nope');
}
