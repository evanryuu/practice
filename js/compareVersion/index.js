const data = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']

function compareVersion(versions) {
  return versions.slice().sort((a, b) => {
    const tempA = a.split('.')
    const tempB = b.split('.')

    const maxLen = Math.max(tempA.length, tempB.length)
    for (let i = 0; i < maxLen; i++) {
      const v1 = +tempA[i] || 0
      const v2 = +tempB[i] || 0
      if (v1 === v2) {
        continue
      }
      return v1 - v2
    }
    return 0
  })
}


console.log(compareVersion(data));
