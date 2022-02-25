export default (elements, { feedback }, i18nInstance) => {
  const { feedbackContainer } = elements;
  console.log('feedback');
  console.log(feedback.name);
  feedbackContainer.innerText = feedback.message;

  if (feedback.name === 'success') {
    feedbackContainer.classList.add('text-success');
    feedbackContainer.classList.remove('text-danger');
  } else {
    feedbackContainer.classList.add('text-danger');
    feedbackContainer.classList.remove('text-success');
  }
};

// const renderInfoMsg = (msg) => {
//   feedbackContainer.textContent = 'Something happened!';
//   if (msg !== 'error') {
//     feedbackContainer.classList.add('text-success');
//     feedbackContainer.classList.remove('text-danger');
//   } else {
//     feedbackContainer.classList.remove('text-success');
//     feedbackContainer.classList.add('text-danger');
//   }
// };