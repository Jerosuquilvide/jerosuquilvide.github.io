// Respuestas correctas en forma de hash SHA-256
const correctHashes = [
  '2c26b46b68ffc68ff99b453c1d30413413422f1640e3b6c2e5b8b7e7d4d7c4c0', // "tokio"
  'e7cf3ef4f17c3999a94f2c6f612e8a888e5c9b3f6f3f3f3f3f3f3f3f3f3f3f3f'  // "php"
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
