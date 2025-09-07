function resetCombo(comboSequence) {
  comboProgress.set(comboSequence.join(''), 0);
  clearTimeout(comboTimeouts.get(comboSequence.join('')));
}

document.addEventListener('keydown', e => {
  const currentKey = e.key.toLowerCase();

  keysDown.push(currentKey)

  for (const combo of combos) {
    const comboKey = combo.sequence.join('');
    let progress = comboProgress.get(comboKey) || 0;

    if (currentKey === combo.sequence[progress]) {
      progress++;
      comboProgress.set(comboKey, progress);

      clearTimeout(comboTimeouts.get(comboKey));
      comboTimeouts.set(
        comboKey,
        setTimeout(() => resetCombo(combo.sequence), 1000));

      if (progress === combo.sequence.length) {
        combo.action()
        resetCombo(combo.sequence);
      }
    } else {
        resetCombo(combo.sequence);
    }
  }
});

document.addEventListener('keyup', e => {
  const currentKey = e.key.toLowerCase();

  keysDown = keysDown.filter(key => key !== currentKey);
})
