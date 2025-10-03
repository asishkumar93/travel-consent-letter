console.log("hi");
buildAPIRequestBody();

function getSessionId() {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  return searchParams.get("session_id");
}

async function buildAPIRequestBody() {
  const body = {
    formData: JSON.parse(localStorage.getItem("formData")),
    templateConfig: JSON.parse(localStorage.getItem("templateConfig")),
    client: JSON.parse(localStorage.getItem("client")),
    validationId: getSessionId(),
  };

  console.log(body);

  const apiUrl =
    "https://qkzwauusd3.execute-api.us-east-1.amazonaws.com/v1/pigeonpost";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(apiUrl, options);
    console.log("Response from server:", response);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    localStorage.clear();
  }
}
