import { apiBaseUrl } from "./settings";

export function GenerateTest(data) {
  return fetch(`${apiBaseUrl}/api/v1/test/generate-test`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function checkTest(data) {
  return fetch(`${apiBaseUrl}/api/v1/test/returnresult`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

// ${apiBaseUrl}/api/test/setuptest?number_of_mcqs=${data.number_of_mcqs}&skill_id=${data.skill_id}
