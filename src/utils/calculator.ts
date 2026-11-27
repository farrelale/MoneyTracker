/**
 * Evaluasi ekspresi kalkulator tanpa eval()
 * Mendukung operator: +, -, *, /
 * Contoh: "50000 + 25000" => 75000
 */
export function evaluateExpression(expression: string): number {
  if (!expression || expression.trim() === '') {
    return 0;
  }

  // Hapus spasi dan karakter non-angka/operator
  const cleaned = expression.replace(/\s/g, '');
  
  // Jika hanya angka, return langsung
  if (/^\d+$/.test(cleaned)) {
    return parseInt(cleaned, 10);
  }

  // Parse token (angka dan operator)
  const tokens: (number | string)[] = [];
  let currentNumber = '';
  
  for (let i = 0; i < cleaned.length; i++) {
    const char = cleaned[i];
    
    if (/\d/.test(char)) {
      currentNumber += char;
    } else if (['+', '-', '*', '/', 'x', 'X', '×', '÷'].includes(char)) {
      if (currentNumber) {
        tokens.push(parseInt(currentNumber, 10));
        currentNumber = '';
      }
      // Normalize operator
      let op = char;
      if (char === 'x' || char === 'X' || char === '×') op = '*';
      if (char === '÷') op = '/';
      tokens.push(op);
    }
  }
  
  // Push angka terakhir
  if (currentNumber) {
    tokens.push(parseInt(currentNumber, 10));
  }

  // Validasi: harus dimulai dan diakhiri dengan angka
  if (tokens.length === 0 || typeof tokens[0] !== 'number' || typeof tokens[tokens.length - 1] !== 'number') {
    throw new Error('Ekspresi tidak valid');
  }

  // Evaluasi perkalian dan pembagian terlebih dahulu
  let i = 0;
  while (i < tokens.length) {
    if (tokens[i] === '*' || tokens[i] === '/') {
      const left = tokens[i - 1] as number;
      const operator = tokens[i] as string;
      const right = tokens[i + 1] as number;
      
      if (operator === '/' && right === 0) {
        throw new Error('Tidak bisa dibagi nol');
      }
      
      const result = operator === '*' ? left * right : Math.floor(left / right);
      tokens.splice(i - 1, 3, result);
      i = i - 1;
    } else {
      i++;
    }
  }

  // Evaluasi penjumlahan dan pengurangan
  i = 0;
  while (i < tokens.length) {
    if (tokens[i] === '+' || tokens[i] === '-') {
      const left = tokens[i - 1] as number;
      const operator = tokens[i] as string;
      const right = tokens[i + 1] as number;
      
      const result = operator === '+' ? left + right : left - right;
      tokens.splice(i - 1, 3, result);
      i = i - 1;
    } else {
      i++;
    }
  }

  return tokens[0] as number;
}

/**
 * Format angka dengan pemisah ribuan
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
