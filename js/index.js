class MyWindow {
  constructor(size, position, title) {
    this.size = size;
    this.position = position;
    this.title = title;
  }

  create() {
    const myWindow = document.createElement('div');

    const posOpt = Object.keys(this.position);

    myWindow.style.cssText = `
      position: fixed;
      background: white;
      border: 1px solid silver;
      width: ${this.size.w}px;
      height: ${this.size.h}px;
      ${posOpt[0]}: ${this.position[posOpt[0]]}px;  
      ${posOpt[1]}: ${this.position[posOpt[1]]}px;
      z-index: 20000; 
    `;
    
    myWindow.innerHTML = `
      <div class="modal-content">
        <span class="close-btn" onclick="MyWindow.closeModal(this)">&times;</span>
        <h3 class="title">${this.title}</h3>
        
      </div>
    `;
    
    document.body.append(myWindow);

    return myWindow;
  }

  static closeModal(element) {
    const modalContent = element.closest('.modal-content').parentNode;
    const overlay = document.querySelector('.overlay');
    modalContent.remove();
    overlay.remove();
  }
}

class ModalWindow extends MyWindow {
  create() {
    const myWindow = super.create();
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');  
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 10000; 
    `;
    document.body.append(overlay);

    return myWindow;
  }
}

class Alert extends ModalWindow {
  constructor(size, position, title, text) {
    super(size, position, title);
    this.text = text;
  }

  create() {
    const myWindow = super.create();
    myWindow.innerHTML = `
      <div class="modal-content">
        <span class="close-btn" onclick="MyWindow.closeModal(this)">&times;</span>
        <h3 class="title">${this.title}</h3>
        <p class="text">${this.text}</p>
      </div>
    `;
  }
}

class Prompt extends ModalWindow {
  constructor(size, position, title, label) {
    super(size, position, title);
    this.label = label;
  }

  create() {
    const myWindow = super.create();

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = this.label;

    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'OK';
    confirmButton.onclick = () => {
      const userInput = inputField.value;
      const modalContent = myWindow.querySelector('.modal-content');
      modalContent.innerHTML = `
        <span class="close-btn" onclick="MyWindow.closeModal(this)">&times;</span>
        <h3 class="title">${this.title}</h3>
        <p class="text">You entered: ${userInput}</p>
      `;
    };

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.onclick = () => {
      myWindow.remove();
      const overlay = document.querySelector('.overlay');
      overlay.remove();
    };

    const buttonContainer = document.createElement('div');
    buttonContainer.appendChild(confirmButton);
    buttonContainer.appendChild(cancelButton);

    const modalContent = myWindow.querySelector('.modal-content');
    modalContent.appendChild(inputField);
    modalContent.appendChild(buttonContainer);
  }
}

class Confirm extends ModalWindow {
  constructor(size, position, title, message) {
    super(size, position, title);
    this.message = message;
  }

  create() {
    const myWindow = super.create();

    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'OK';
    confirmButton.onclick = () => {
      const userConfirmed = 'You pressed OK!'; 
      const modalContent = myWindow.querySelector('.modal-content');
      modalContent.innerHTML = `
        <span class="close-btn" onclick="MyWindow.closeModal(this)">&times;</span>
        <h3 class="title">${this.title}</h3>
        <p class="text">${userConfirmed}</p>
      `;
    };

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.onclick = () => {
      myWindow.remove();
      const overlay = document.querySelector('.overlay');
      overlay.remove();
    };

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.appendChild(confirmButton);
    buttonContainer.appendChild(cancelButton);

    const modalContent = myWindow.querySelector('.modal-content');
    modalContent.innerHTML += `
      <p class="text">${this.message}</p>
    `;
    modalContent.appendChild(buttonContainer);
  }
}

function alert() {
  const alertWindow = new Alert({ w: 200, h: 200 }, { top: 200, left: 580 }, 'Alert', 'This is an alert!');
  alertWindow.create();
}

function prompt() {
  const promptWindow = new Prompt({ w: 200, h: 200 }, { top: 200, left: 580 }, 'Prompt', 'Please enter your name:');
  promptWindow.create();
}

function confirm() {
  const confirmWindow = new Confirm({ w: 200, h: 200 }, { top: 200, left: 580 }, 'Confirm', 'Press a button!');
  confirmWindow.create();
}

