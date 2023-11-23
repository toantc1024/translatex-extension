function computeLPSArray(pat, M, lps) {
  // length of the previous longest prefix suffix
  var len = 0;
  var i = 1;
  lps[0] = 0; // lps[0] is always 0

  // the loop calculates lps[i] for i = 1 to M-1
  while (i < M) {
    if (pat.charAt(i) == pat.charAt(len)) {
      len++;
      lps[i] = len;
      i++;
    } // (pat[i] != pat[len])
    else {
      // This is tricky. Consider the example.
      // AAACAAAA and i = 7. The idea is similar
      // to search step.
      if (len != 0) {
        len = lps[len - 1];

        // Also, note that we do not increment
        // i here
      } // if (len == 0)
      else {
        lps[i] = len;
        i++;
      }
    }
  }
}

// export function KMPSearch(txt, pat) {
//   var M = pat.length;
//   var N = txt.length;

//   // create lps[] that will hold the longest
//   // prefix suffix values for pattern
//   var lps = [];
//   var j = 0; // index for pat[]
//   // Preprocess the pattern (calculate lps[]
//   // array)
//   computeLPSArray(pat, M, lps);

//   var i = 0; // index for txt[]
//   var result = [];
//   while (N - i >= M - j) {
//     if (pat.charAt(j) == txt.charAt(i)) {
//       j++;
//       i++;
//     }
//     if (j == M) {
//       result.push(i - j);
//       j = lps[j - 1];
//     }

//     // mismatch after j matches
//     else if (i < N && pat.charAt(j) != txt.charAt(i)) {
//       // Do not match lps[0..lps[j-1]] characters,
//       // they will match anyway
//       if (j != 0) j = lps[j - 1];
//       else i = i + 1;
//     }
//   }
//   return result;
// }

export function KMPSearch(text, pat) {
  if (!pat) return [];
  let lps = [...new Array(pat.length)].map((_, i) => 0);
  let prevLPS = 0,
    i = 1,
    j;
  while (i < pat.length) {
    if (pat[i] == pat[prevLPS]) {
      lps[i] = lps[prevLPS] + 1;
      i += 1;
      prevLPS += 1;
    } else if (prevLPS == 0) {
      lps[i] = 0;
      i += 1;
    } else {
      prevLPS = lps[prevLPS - 1];
    }
  }
  // console.log(prevLPS);

  (i = 0), (j = 0);
  var pos = [];
  while (i < text.length) {
    if (text[i] == pat[j]) {
      i++;
      j++;
    } else {
      if (j == 0) {
        i += 1;
      } else {
        j = lps[j - 1];
      }
    }

    if (j == pat.length) {
      pos.push(i - pat.length);
    }
  }

  return pos;
}
