import {openModal, closeModal} from './modal';
import {postData} from '../services/services';
function form(formSelector,modalTimerId) {
  //Forms
  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: 'img/form/spinner.svg',
    sucsess: 'Thank you!',
    failure: 'Something wrong'
  };
  forms.forEach(item => {
    bindPostData(item);
  });



  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display : block;
        margin : 0 auto;
        `;

      form.insertAdjacentElement('afterend', statusMessage);



      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));



      postData('http://localhost:3000/requests', json)
        .then(data => {
          console.log(data);
          showThanksModal(message.sucsess);
          statusMessage.remove();
        }).catch(() => {
          showThanksModal(message.failure);
        }).finally(() => {
          form.reset();
        })



    });
  }
  function showThanksModal(message) {
    const previousModalDialog = document.querySelector('.modal__dialog');

    previousModalDialog.classList.add('hideModal');
    openModal('.modal', modalTimerId);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = ` 
    <div class = "modal__content">
      <div class = "modal__close" data-close>&times;</div>
      <div class = "modal__title">${message}</div>
    </div>
    `;
    document.querySelector('.modal').prepend(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      previousModalDialog.classList.add('showModal');
      previousModalDialog.classList.remove('hideModal');
      closeModal('.modal');
    }, 4000);
  }
}
export default form;