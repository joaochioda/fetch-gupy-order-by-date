const axios = require("axios");
const dateNow = "2022-12-28T00:00:00.000Z";
const fetchVagas = () => {
  return axios
    .get(
      "https://portal.api.gupy.io/api/v1/jobs?jobName=react&limit=200&offset=0"
    )
    .then((response) => {
      return response.data;
    });
};

(async () => {
  const vagas = await fetchVagas();
  const vagasOrdenadas = vagas.data.sort(publishedDate);

  for (let i = 0; i < 10; i++) {
    if (vagasOrdenadas[i].publishedDate > dateNow) {
      console.log("-------------------------------------------");
      console.log(`name: ${vagasOrdenadas[i].name}`);
      console.log(`url: ${vagasOrdenadas[i].jobUrl}`);
      console.log(`publishedDate: ${vagasOrdenadas[i].publishedDate}`);
      console.log("-------------------------------------------");
    }
  }
})();

function publishedDate(a, b) {
  return new Date(b.publishedDate) - new Date(a.publishedDate);
}
