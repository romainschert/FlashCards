<script>
  // Sélectionner toutes les cartes
  const flashcards = document.querySelectorAll('.flashcard');

  // Ajouter un événement de clic à chaque carte
  flashcards.forEach(card => {
    card.addEventListener('click', () => {
      // Ajouter ou retirer la classe 'flipped' pour activer le retournement
      card.classList.toggle('flipped');
    });
  });
</script>
