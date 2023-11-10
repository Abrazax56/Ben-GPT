
const form = document.forms['form'];
const promptt = document.querySelector(".prompt");
const pertanyaan = document.querySelector('.pertanyaan');
const jawaban = document.querySelector('.jawaban');
const btnLoading = document.querySelector('.btn-loading');
const btnSubmit = document.querySelector('.button_submit');

form.addEventListener("submit", e => {
  e.preventDefault();
  btnLoading.classList.toggle('d-none');
  btnSubmit.classList.toggle('d-none');
  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      "Content-type" : 'application/json',
      "Authorization" : 'Bearer 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'
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: promptt.value}]
    })
  })
  .then(response => response.json())
  .then(response => {
    btnLoading.classList.toggle('d-none');
    btnSubmit.classList.toggle('d-none');
    const res = response.choices[0].message.content;
    const resReplaced = res.replace(/```|```/gi, '');
    pertanyaan.textContent = promptt.value;
    jawaban.textContent = resReplaced;
    form.reset();
  })
  .catch(err => {
    alert(err);
  });
});
