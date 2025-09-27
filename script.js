// Respuestas correctas en forma de hash SHA-256
const correctHashes = [
  '434de5e6a47f94752708362f575012e50855c5de6eb557564c9d7ae267b35e4c', // "tokio"
  '12a5d18ee896e59954bdce0f4acc7212eebe03dae1834ef4ce160ac5afa5c4a8'  // "php"
];

async function hashAnswer(answer) {
  const encoder = new TextEncoder();
  const data = encoder.encode(answer.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

document.getElementById('quizForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const answers = [formData.get('q1'), formData.get('q2')];

  const hashedAnswers = await Promise.all(answers.map(hashAnswer));
  const isCorrect = hashedAnswers.every((hash, i) => hash === correctHashes[i]);

  if (isCorrect) {
    document.getElementById('secretContent').classList.remove('hidden');
  } else {
    alert('Alguna respuesta es incorrecta. Intenta de nuevo.');
  }
});
