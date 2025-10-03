// --- EDITE AQUI AS SUAS 10 MÚSICAS ---
const musicOptions = [
    "The Summoning",
    "Alkaline",
    "Chokehold",
    "Granite",
    "The Offering",
    "Vore",
    "Take Me Back To Eden",
    "Aqua Regia",
    "Hypnosis",
    "Blood Sport"
];
// -----------------------------------------

const pollContainer = document.getElementById('poll-container');
const pollOptionsContainer = document.getElementById('poll-options');
const pollTitle = document.getElementById('poll-title').textContent; // Pega o título do HTML

// Gera um ID único para a enquete baseado no título, para o localStorage
const pollId = 'poll_' + pollTitle.replace(/\s+/g, '_');

// Função para mostrar as opções de voto
function showOptions() {
    pollOptionsContainer.innerHTML = ''; // Limpa opções anteriores
    musicOptions.forEach(option => {
        const button = document.createElement('button');
        button.className = 'poll-option';
        button.textContent = option;
        button.onclick = () => handleVote(option);
        pollOptionsContainer.appendChild(button);
    });
}

// Função para lidar com o voto
function handleVote(votedOption) {
    // Pega os votos atuais do localStorage ou cria um objeto novo
    let votes = JSON.parse(localStorage.getItem(pollId + '_votes')) || {};
    
    // Inicializa os votos para todas as opções se ainda não existirem
    musicOptions.forEach(opt => {
        if (!votes[opt]) {
            votes[opt] = 0;
        }
    });

    // Adiciona o voto
    votes[votedOption]++;

    // Salva os votos atualizados no localStorage
    localStorage.setItem(pollId + '_votes', JSON.stringify(votes));
    // Salva qual opção foi votada para destacar depois
    localStorage.setItem(pollId + '_voted_option', votedOption);

    // Mostra os resultados
    showResults();
}

// Função para mostrar os resultados
function showResults() {
    const votes = JSON.parse(localStorage.getItem(pollId + '_votes')) || {};
    const votedOption = localStorage.getItem(pollId + '_voted_option');
    
    const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);

    pollOptionsContainer.innerHTML = ''; // Limpa as opções

    musicOptions.forEach(option => {
        const voteCount = votes[option] || 0;
        const percentage = totalVotes === 0 ? 0 : ((voteCount / totalVotes) * 100).toFixed(1);

        const resultElement = document.createElement('div');
        resultElement.className = 'poll-result';
        if (option === votedOption) {
            resultElement.classList.add('voted'); // Adiciona classe se for a opção votada
        }

        resultElement.innerHTML = `
            <div class="result-text">${option} (${voteCount} votos) - ${percentage}%</div>
            <div class="result-bar" style="width: ${percentage}%;"></div>
        `;
        pollOptionsContainer.appendChild(resultElement);
    });
}

// Lógica principal: Verifica se o usuário já votou nesta enquete
window.onload = function() {
    if (localStorage.getItem(pollId + '_voted_option')) {
        // Se já votou, mostra os resultados
        showResults();
    } else {
        // Se não votou, mostra as opções de voto
        showOptions();
    }
};
