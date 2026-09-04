const numberElement = document.getElementById("number");
const statusElement = document.getElementById("status");
const updateButton = document.getElementById("updateButton");

// Fetch the current number when the page initially loads
async function loadClicks() {
  try {
    const response = await fetch("/app/clicks", {
      method: "GET",
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Could not fetch clicks");
    }

    const data = await response.json();

    if (data.clicks === undefined) {
      throw new Error("Invalid response from server");
    }

    numberElement.textContent = data.clicks;
  } catch (error) {
    numberElement.textContent = "Could not fetch the number.";
    console.error(error);
  }
}

// Increment and fetch the updated number when clicked
updateButton.addEventListener("click", async () => {
  updateButton.disabled = true;
  statusElement.textContent = "Updating...";

  try {
    const response = await fetch("/app/clicks", {
      method: "POST"
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();

    if (data.clicks === undefined) {
      throw new Error("Invalid response from server");
    }

    numberElement.textContent = data.clicks;
    statusElement.textContent = "Number updated successfully.";
  } catch (error) {
    statusElement.textContent = "Could not update number.";
    console.error(error);
  } finally {
    updateButton.disabled = false;
  }
});

// Run automatically when the page loads
loadClicks();
