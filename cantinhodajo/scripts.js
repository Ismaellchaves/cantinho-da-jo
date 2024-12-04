const selectedTimeContainer = document.querySelector("#selected-time ul");
const selectedServicesContainer = document.querySelector("#selected-services ul");
const clientNameInput = document.querySelector("#client-name"); // Captura o campo de nome
let selectedTime = "";
let selectedServices = [];

// Adicionar evento aos botões de horários
document.querySelectorAll(".time-slot").forEach(button => {
    button.addEventListener("click", function () {
        selectedTime = this.dataset.time;
        updateSelectedTime();
    });
});

// Adicionar evento ao botão "Adicionar Horário" para adicionar o horário personalizado
const addCustomTimeButton = document.getElementById("add-custom-time");
const customTimeInput = document.getElementById("custom-time");

addCustomTimeButton.addEventListener("click", function () {
    const customTime = customTimeInput.value.trim();
    if (customTime) {
        selectedTime = customTime;
        updateSelectedTime();
    }
});

// Adicionar evento aos botões de serviços
document.querySelectorAll(".service").forEach(button => {
    button.addEventListener("click", function () {
        const service = this.dataset.service;
        if (!selectedServices.includes(service)) {
            selectedServices.push(service);
            updateSelectedServices();
        }
    });
});

// Atualizar horário selecionado na interface
function updateSelectedTime() {
    selectedTimeContainer.innerHTML = "";
    if (selectedTime) {
        const listItem = document.createElement("li");
        listItem.textContent = selectedTime;

        const removeButton = document.createElement("button");
        removeButton.textContent = "X";
        removeButton.className = "remove-item";
        removeButton.addEventListener("click", () => {
            selectedTime = "";
            updateSelectedTime();
        });

        listItem.appendChild(removeButton);
        selectedTimeContainer.appendChild(listItem);
    }
}

// Atualizar serviços selecionados na interface
function updateSelectedServices() {
    selectedServicesContainer.innerHTML = "";
    selectedServices.forEach(service => {
        const listItem = document.createElement("li");
        listItem.textContent = service;

        const removeButton = document.createElement("button");
        removeButton.textContent = "X";
        removeButton.className = "remove-item";
        removeButton.addEventListener("click", () => {
            selectedServices = selectedServices.filter(s => s !== service);
            updateSelectedServices();
        });

        listItem.appendChild(removeButton);
        selectedServicesContainer.appendChild(listItem);
    });
}

// Atualizar o link do botão do WhatsApp
document.getElementById("whatsapp-button").addEventListener("click", function (event) {
    const clientName = clientNameInput.value.trim(); // Obtém o nome da cliente
    if (!clientName || !selectedTime || selectedServices.length === 0) {
        alert("Por favor, preencha todos os campos antes de agendar.");
        event.preventDefault(); // Impede o redirecionamento se algo estiver faltando
    } else {
        const message = `💇‍♀️ Olá Cantinho Da Jô, gostaria de agendar um horário.⏰ \nNome: ${clientName}\nHorário: ${selectedTime}\nServiços: ${selectedServices.join(", ")}`;
        const phone = "5588993495533"; // Substitua pelo número do WhatsApp
        this.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    }
});

// Função para resetar o formulário após o agendamento
function resetForm() {
    selectedTime = "";
    selectedServices = [];
    clientNameInput.value = "";
    updateSelectedTime();
    updateSelectedServices();
}

// Chama o reset após o envio
document.querySelector("#whatsapp-button").addEventListener("click", () => {
    resetForm();
});
