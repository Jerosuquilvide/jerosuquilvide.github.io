const correctHashes = [
  '91decd0c42b79a764bbc9d12792363115ad4392c5b91e731c772141575daf369',
  '07936a243cd14f0c9e30fe29852a44fe52134636ad2afee524a3cd82ef1630c6',
  '8d6b69638b96ccd3d80ba9350f1f769791e0f92de52f7c745f215f43c6a2f0e1'
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
  const answers = [formData.get('q1'), formData.get('q2'),formData.get('q3')];

  const hashedAnswers = await Promise.all(answers.map(hashAnswer));
  const isCorrect = hashedAnswers.every((hash, i) => hash === correctHashes[i]);

  if (isCorrect) {
    Swal.fire({
      title: "Una mas, yo no te amo, yo te ...",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "A ver...",
      showLoaderOnConfirm: true,
      preConfirm: async (text) => {
        try {
          if(text == "amito"){
            Swal.fire({
              title: "Ok, si sos vos , hola Aldi :3",
              icon: "success",
              draggable: true
            });
            let p1 = document.getElementById('principal')
            p1.setAttribute('hidden',true)
            // document.getElementById('principal').classList.add('ocultar')
            // document.getElementById('secundario').classList.remove('ocultar')
            let p2 = document.getElementById('secundario')
            p2.style.display = '';
            p2.removeAttribute('hidden')
          }else{
            Swal.fire({
              title: "Juuuira bicho",
              icon: "error",
              draggable: true
            });
          }
          
          
        } catch (error) {
          Swal.showValidationMessage(`
            Request failed: ${error}
          `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    })

  } else {
    alert('Alguna respuesta es incorrecta. Intenta de nuevo.');
  }
});

