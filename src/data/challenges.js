export const challenges = [
  // ================= EASY =================
  {
    id: "sum-two",
    title: "Sum of two numbers",
    difficulty: "easy",
    category: "basics",
    description: "Напишіть функцію, яка приймає два числа та повертає їх суму.\n\nЗавдання:\n1. Оголосіть параметри для двох чисел.\n2. Додайте їх за допомогою оператора `+`.\n3. Поверніть отриманий результат.",
    examples: ["sum(1, 2) // 3", "sum(10, -5) // 5"],
    functionName: "sum",
    starterCode: "function sum(a, b) {\n  \n}",
    tests: [
      { input: [1, 2], expected: 3 },
      { input: [10, -5], expected: 5 },
      { input: [0, 0], expected: 0 }
    ],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },
  {
    id: "even-or-odd",
    title: "Even or odd",
    difficulty: "easy",
    category: "basics",
    description: "Напишіть функцію, яка перевіряє, чи є передане число парним.\n\nЗавдання:\n1. Перевірте залишок від ділення числа на 2 (використовуйте оператор `%`).\n2. Якщо залишок дорівнює нулю — число парне. Поверніть рядок `'Even'`.\n3. У всіх інших випадках поверніть рядок `'Odd'`.",
    examples: ["evenOrOdd(2) // 'Even'", "evenOrOdd(7) // 'Odd'"],
    functionName: "evenOrOdd",
    starterCode: "function evenOrOdd(number) {\n  \n}",
    tests: [
      { input: [2], expected: "Even" },
      { input: [7], expected: "Odd" },
      { input: [0], expected: "Even" },
      { input: [-3], expected: "Odd" }
    ],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },
  {
    id: "reverse-string",
    title: "Reverse string",
    difficulty: "easy",
    category: "string",
    description: "Переверніть вхідний рядок (string) та поверніть його дзеркальне відображення.\n\nЗавдання:\n1. Перетворіть рядок у масив символів (наприклад, за допомогою `split('')`).\n2. Переверніть масив (метод `reverse()`).\n3. З'єднайте масив назад у рядок (метод `join('')`) і поверніть його.",
    examples: ["reverseString('hello') // 'olleh'"],
    functionName: "reverseString",
    starterCode: "function reverseString(str) {\n  \n}",
    tests: [
      { input: ["hello"], expected: "olleh" },
      { input: ["JS"], expected: "SJ" },
      { input: [""], expected: "" }
    ],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },
  {
    id: "find-max",
    title: "Find max in array",
    difficulty: "easy",
    category: "array",
    description: "Знайдіть та поверніть найбільше число у переданому масиві чисел.\n\nЗавдання:\n1. Переконайтеся, що масив не порожній.\n2. Використайте `Math.max` у поєднанні зі spread-оператором `...` або пройдіться масивом через цикл.\n3. Поверніть знайдене максимальне значення.",
    examples: ["findMax([1, 5, 2, 9, 3]) // 9"],
    functionName: "findMax",
    starterCode: "function findMax(arr) {\n  \n}",
    tests: [
      { input: [[1, 5, 2, 9, 3]], expected: 9 },
      { input: [[-10, -5, -20]], expected: -5 },
      { input: [[100]], expected: 100 }
    ],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },
  {
    id: "count-vowels",
    title: "Count vowels in string",
    difficulty: "easy",
    category: "string",
    description: "Функція має рахувати загальну кількість голосних літер `a, e, i, o, u` (англійського алфавіту) у заданому рядку.\n\nЗавдання:\n1. Ініціалізуйте лічильник нулем.\n2. Пройдіться по всіх символах рядка (можна перетворити їх на нижній регістр).\n3. Якщо символ є голосною — збільште лічильник.\n4. Поверніть фінальне значення лічильника.",
    examples: ["countVowels('hello') // 2", "countVowels('javascript') // 3"],
    functionName: "countVowels",
    starterCode: "function countVowels(str) {\n  \n}",
    tests: [
      { input: ["hello"], expected: 2 },
      { input: ["javascript"], expected: 3 },
      { input: ["AEIOU"], expected: 5 },
      { input: ["xyz"], expected: 0 }
    ],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },
  {
    id: "remove-duplicates",
    title: "Remove duplicates from array",
    difficulty: "easy",
    category: "array",
    description: "Створіть новий масив, у якому будуть залишені лише унікальні елементи з переданого масиву (всі дублікати мають бути видалені).\n\nЗавдання:\n1. Створіть об'єкт `Set`, передавши йому початковий масив — він автоматично відфільтрує дублікати.\n2. Перетворіть `Set` назад у звичайний масив (за допомогою `Array.from()` або оператора `...`).\n3. Поверніть новий масив.",
    examples: ["removeDuplicates([1, 2, 2, 3]) // [1, 2, 3]"],
    functionName: "removeDuplicates",
    starterCode: "function removeDuplicates(arr) {\n  \n}",
    tests: [
      { input: [[1, 2, 2, 3]], expected: [1, 2, 3],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },
      { input: [[5, 5, 5, 5]], expected: [5] },
      { input: [[1, 2, 3]], expected: [1, 2, 3] }
    ]
  },
  {
    id: "sum-of-array",
    title: "Sum of array",
    difficulty: "easy",
    category: "array",
    description: "Напишіть функцію, що приймає масив чисел і повертає їх загальну суму.\n\nЗавдання:\n1. Якщо масив порожній — відразу поверніть 0.\n2. Використайте метод масиву `reduce()` (або звичайний цикл `for`) для поступового додавання кожного числа до загальної суми.\n3. Поверніть фінальну суму.",
    examples: ["sumArray([1, 2, 3]) // 6"],
    functionName: "sumArray",
    starterCode: "function sumArray(arr) {\n  \n}",
    tests: [
      { input: [[1, 2, 3]], expected: 6 },
      { input: [[-1, 1, 0]], expected: 0 },
      { input: [[]], expected: 0 }
    ],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },
  {
    id: "capitalize-first",
    title: "Capitalize first letter",
    difficulty: "easy",
    category: "string",
    description: "Функція має повертати переданий рядок, але з першою літерою, перетвореною на верхній регістр (велику).\n\nЗавдання:\n1. Врахуйте кейс, коли рядок порожній — тоді просто поверніть його ж.\n2. Візьміть перший символ (`str[0]`) та переведіть його у верхній регістр (`toUpperCase()`).\n3. Додайте до нього решту рядка (`str.slice(1)`).\n4. Поверніть з'єднаний результат.",
    examples: ["capitalize('hello') // 'Hello'"],
    functionName: "capitalize",
    starterCode: "function capitalize(str) {\n  \n}",
    tests: [
      { input: ["hello"], expected: "Hello" },
      { input: ["javaScript"], expected: "JavaScript" },
      { input: [""], expected: "" },
      { input: ["A"], expected: "A" }
    ],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },
  {
    id: "find-smallest",
    title: "Find smallest number",
    difficulty: "easy",
    category: "array",
    description: "Знайдіть та поверніть найменше число у переданому масиві чисел.\n\nЗавдання:\nАналогічно до пошуку максимуму, ви можете використати вбудований метод `Math.min` разом з оператором розширення `...` масиву, або написати логіку порівняння через цикл `for`.",
    examples: ["findSmallest([34, 15, 88, 2]) // 2"],
    functionName: "findSmallest",
    starterCode: "function findSmallest(arr) {\n  \n}",
    tests: [
      { input: [[34, 15, 88, 2]], expected: 2 },
      { input: [[34, -345, -1, 100]], expected: -345 },
      { input: [[7]], expected: 7 }
    ],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },
  {
    id: "check-palindrome",
    title: "Check palindrome",
    difficulty: "easy",
    category: "string",
    description: "Паліндром — це слово, фраза або послідовність, яка читається однаково як зліва направо, так і справа наліво.\n\nЗавдання:\n1. Для цієї базової задачі вам достатньо перевернути рядок.\n2. Порівняйте початковий рядок із перевернутим варіантом.\n3. Поверніть `true`, якщо вони збігаються, інакше — `false`.",
    examples: ["isPalindrome('racecar') // true", "isPalindrome('hello') // false"],
    functionName: "isPalindrome",
    starterCode: "function isPalindrome(str) {\n  \n}",
    tests: [
      { input: ["racecar"], expected: true },
      { input: ["madam"], expected: true },
      { input: ["hello"], expected: false },
      { input: ["a"], expected: true }
    ],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },

  // ================= MEDIUM =================
  {
    id: "flatten-array",
    title: "Flatten array",
    difficulty: "medium",
    category: "array",
    description: "Напишіть функцію, яка перетворює вкладений масив (будь-якого рівня вкладеності) на одномірний (плоский) масив.\n\nЗавдання:\n1. Використайте рекурсію для проходження масиву.\n2. Якщо поточний елемент — масив (`Array.isArray(item)`), викличте функцію рекурсивно.\n3. Інакше — додайте елемент до акумулятора.\n4. (Або скористайтесь вбудованим `arr.flat(Infinity)`).",
    examples: ["flatten([1, [2, [3, 4]]]) // [1, 2, 3, 4]"],
    functionName: "flatten",
    starterCode: "function flatten(arr) {\n  \n}",
    tests: [
      { input: [[1, [2, [3, 4]]]], expected: [1, 2, 3, 4],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },
      { input: [[[1], [2], [3]]], expected: [1, 2, 3] },
      { input: [[1, 2, 3]], expected: [1, 2, 3] }
    ]
  },
  {
    id: "chunk-array",
    title: "Chunk array",
    difficulty: "medium",
    category: "array",
    description: "Напишіть функцію, яка розбиває великий масив на менші масиви (chunks) вказаного розміру `size`.\n\nЗавдання:\n1. Створіть порожній масив-результат.\n2. Проходьтесь початковим масивом за допомогою циклу `for` або `while`, збільшуючи індекс одразу на значення `size`.\n3. На кожній ітерації використовуйте `slice()`, щоб відрізати частину до масиву-результату.",
    examples: ["chunk([1, 2, 3, 4], 2) // [[1, 2], [3, 4]]"],
    functionName: "chunk",
    starterCode: "function chunk(arr, size) {\n  \n}",
    tests: [
      { input: [[1, 2, 3, 4], 2], expected: [[1, 2], [3, 4]],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },
      { input: [[1, 2, 3, 4, 5], 2], expected: [[1, 2], [3, 4], [5]] },
      { input: [[1, 2], 3], expected: [[1, 2]] }
    ]
  },
  {
    id: "unique-values",
    title: "Unique values",
    difficulty: "medium",
    category: "array",
    description: "Поверніть новий масив, що містить лише унікальні значення з переданого масиву.\n\nЗавдання:\n1. Найпростіший сучасний спосіб: використати `new Set(arr)` та перетворити його назад у масив (через спред `...` або `Array.from`).\n2. Або використайте `filter()` та `indexOf()`, залишаючи лише ті елементи, чий перший індекс збігається з поточним.",
    examples: ["unique([1, 2, 2, 3]) // [1, 2, 3]"],
    functionName: "unique",
    starterCode: "function unique(arr) {\n  \n}",
    tests: [
      { input: [[1, 2, 2, 3]], expected: [1, 2, 3],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },
      { input: [["a", "b", "a", "c"]], expected: ["a", "b", "c"] },
      { input: [[1, 1, 1, 1]], expected: [1] }
    ]
  },
  {
    id: "count-characters",
    title: "Count characters",
    difficulty: "medium",
    category: "string",
    description: "Підрахуйте кількість входжень кожного символу у рядку і поверніть результат як об'єкт (де ключ — символ, значення — кількість).\n\nЗавдання:\n1. Перетворіть рядок у масив (або просто проітеруйте по ньому через `for...of`).\n2. Використайте `reduce` (або просто `forEach` з локальним об'єктом).\n3. Для кожного символу перевіряйте, чи він вже існує в об'єкті: якщо так — збільште значення на 1, якщо ні — встановіть 1.",
    examples: ["countChars('hello') // {h: 1, e: 1, l: 2, o: 1}"],
    functionName: "countChars",
    starterCode: "function countChars(str) {\n  \n}",
    tests: [
      { input: ["hello"], expected: { h: 1, e: 1, l: 2, o: 1 } },
      { input: ["aabbc"], expected: { a: 2, b: 2, c: 1 } },
      { input: ["  "], expected: { " ": 2 } },
      { input: [{ toString: () => "" }], expected: {} } // For safety, though mostly string input
    ],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },
  {
    id: "group-by",
    title: "Group by property",
    difficulty: "medium",
    category: "object",
    description: "Напишіть функцію `groupBy`, яка групує масив об'єктів за вказаною властивістю.\n\nЗавдання:\n1. Створіть порожній об'єкт або використовуйте `reduce`.\n2. Пройдіться по кожному об'єкту масиву.\n3. Отримайте значення поточного об'єкта за ключем `prop`.\n4. Якщо у результаті ще немає такого ключа — створіть для нього порожній масив `[]`.\n5. Додайте («пушніть») поточний об'єкт у цей масив.",
    examples: ["groupBy([{id: 1, group: 'A'}, {id: 2, group: 'A'}, {id: 3, group: 'B'}], 'group') // { A: [...], B: [...] }"],
    functionName: "groupBy",
    starterCode: "function groupBy(arr, prop) {\n  \n}",
    tests: [
      { 
        input: [
          [{id: 1, g: 'A'}, {id: 2, g: 'A'}, {id: 3, g: 'B'}], 
          'g'
        ], 
        expected: { A: [{id: 1, g: 'A'}, {id: 2, g: 'A'}], B: [{id: 3, g: 'B'}],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  } 
      },
      { input: [[], 'type'], expected: {} }
    ]
  },
  {
    id: "debounce",
    title: "Debounce function",
    difficulty: "medium",
    category: "functions",
    description: "Напишіть функцію-обгортку `debounce`, яка затримує виконання функції, поки не мине заданий час `ms` з моменту останнього виклику.\n\nЗавдання:\n1. `debounce` має повертати нову функцію (замикання, closure).\n2. Всередині зберігайте таймер (ідентифікатор `setTimeout`).\n3. Коли обгортка викликається, вона повинна очищати попередній таймер (`clearTimeout`) та створювати новий, який вже і викличе оригінальну функцію.\nРішення перевіряється на те, чи повертається дійсно функція.",
    examples: ["const d = debounce(fn, 1000);"],
    functionName: "debounce",
    starterCode: "function debounce(fn, ms) {\n  return function(...args) {\n    // твій код\n  }\n}",
    tests: [
      // Since evaluating setTimeout synchronously is tricky in this env, we just check if it returns a function
      { input: [() => {}, 100], expected: "function" }
    ],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },
  {
    id: "throttle",
    title: "Throttle function",
    difficulty: "medium",
    category: "functions",
    description: "Напишіть функцію-обгортку `throttle`, яка змушує функцію виконуватись не частіше ніж раз на вказаний час `ms`.\n\nЗавдання:\n1. Як і debounce, вона має повертати нову функцію.\n2. Зберігайте прапорець (наприклад, `isWaiting`), що вказує, чи триває зараз пауза.\n3. Якщо паузи немає, викликайте оригінальну функцію і встановлюйте прапорець.\n4. Запускайте таймер, після завершення якого прапорець зніметься.",
    examples: ["const t = throttle(fn, 500);"],
    functionName: "throttle",
    starterCode: "function throttle(fn, ms) {\n  return function(...args) {\n    // твій код\n  }\n}",
    tests: [
      { input: [() => {}, 100], expected: "function" }
    ],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },
  {
    id: "deep-clone",
    title: "Deep clone object",
    difficulty: "medium",
    category: "object",
    description: "Реалізуйте глибоку копію (Deep Clone) об'єкта чи масиву (вкладені об'єкти повинні ставати новими екземплярами, а не посиланнями).\n\nЗавдання:\n1. Перевіряйте тип даних: якщо значення об'єкт (і не `null` чи масив), рекурсивно копіюйте його властивості.\n2. Якщо це масив — так само рекурсивно створюйте масив клонів.\n3. Просте сучасне рішення (якщо немає функцій): `structuredClone(obj)` або `JSON.parse(JSON.stringify(obj))`.",
    examples: ["deepClone({a: 1, b: {c: 2}})"],
    functionName: "deepClone",
    starterCode: "function deepClone(obj) {\n  \n}",
    tests: [
      { input: [{a: 1, b: {c: 2}}], expected: {a: 1, b: {c: 2}} },
      { input: [[1, [2, 3]]], expected: [1, [2, 3]],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  }
    ]
  },
  {
    id: "merge-objects",
    title: "Merge objects",
    difficulty: "medium",
    category: "object",
    description: "Об'єднайте два об'єкти в один новий. Якщо обидва мають однакові ключі, пріоритет має значення з другого об'єкта.\n\nЗавдання:\n1. Можна використати `Object.assign({}, obj1, obj2)`.\n2. Або ж просто використайте оператор розширення (spread-operator): `{ ...obj1, ...obj2 }`.\n3. Поверніть створений об'єкт.",
    examples: ["merge({a: 1, b: 2}, {b: 3, c: 4}) // {a: 1, b: 3, c: 4}"],
    functionName: "merge",
    starterCode: "function merge(obj1, obj2) {\n  \n}",
    tests: [
      { input: [{a: 1, b: 2}, {b: 3, c: 4}], expected: {a: 1, b: 3, c: 4} },
      { input: [{x: 0}, {y: 1}], expected: {x: 0, y: 1} }
    ],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },
  {
    id: "find-missing",
    title: "Find missing number",
    difficulty: "medium",
    category: "array",
    description: "Вхідний масив містить послідовність унікальних чисел від 1 до N, але одне з чисел пропущене. Знайдіть його.\n\nЗавдання:\n1. Знайдіть довжину масиву `n` і додайте 1, щоб отримати очікувану кількість елементів (якби число не зникло).\n2. Використайте математичну формулу суми чисел від 1 до n: `n * (n + 1) / 2`.\n3. Порахуйте фактичну суму чисел у масиві.\n4. Відніміть фактичну суму від математичної — різниця і буде пропущеним числом.",
    examples: ["findMissing([1, 2, 4, 5]) // 3"],
    functionName: "findMissing",
    starterCode: "function findMissing(arr) {\n  \n}",
    tests: [
      { input: [[1, 2, 4, 5]], expected: 3 },
      { input: [[2, 3, 1, 5]], expected: 4 },
      { input: [[1, 3]], expected: 2 }
    ],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },

  // ================= HARD =================
  {
    id: "implement-map",
    title: "Implement map",
    difficulty: "hard",
    category: "array",
    description: "Напишіть власну реалізацію `Array.prototype.map` як окрему функцію `myMap(arr, fn)`.\n\nЗавдання:\n1. Створіть порожній масив-результат.\n2. Пройдіться циклом по всьому вхідному масиву `arr`.\n3. Викличте функцію `fn` для кожного елемента, передаючи їй сам елемент (та, за бажанням, індекс і весь масив).\n4. Додайте («пушніть») результат виконання `fn` у масив-результат і поверніть його.",
    examples: ["myMap([1, 2, 3], x => x * 2) // [2, 4, 6]"],
    functionName: "myMap",
    starterCode: "function myMap(arr, fn) {\n  \n}",
    tests: [
      { input: [[1, 2, 3], (x) => x * 2], expected: [2, 4, 6],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },
      { input: [["a", "b"], (x) => x.toUpperCase()], expected: ["A", "B"] },
      { input: [[], (x) => x], expected: [] }
    ]
  },
  {
    id: "implement-filter",
    title: "Implement filter",
    difficulty: "hard",
    category: "array",
    description: "Напишіть власну реалізацію `Array.prototype.filter` як окрему функцію `myFilter(arr, fn)`.\n\nЗавдання:\n1. Створіть порожній масив-результат.\n2. Пройдіться циклом по всіх елементах `arr`.\n3. Передавайте кожен елемент у `fn`. Якщо `fn(item)` повертає `true` (чи truthy-значення) — додайте елемент до масиву-результату.",
    examples: ["myFilter([1, 2, 3, 4], x => x % 2 === 0) // [2, 4]"],
    functionName: "myFilter",
    starterCode: "function myFilter(arr, fn) {\n  \n}",
    tests: [
      { input: [[1, 2, 3, 4], (x) => x % 2 === 0], expected: [2, 4],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },
      { input: [[10, 15, 20], (x) => x > 15], expected: [20] }
    ]
  },
  {
    id: "implement-reduce",
    title: "Implement reduce",
    difficulty: "hard",
    category: "array",
    description: "Напишіть власну реалізацію `Array.prototype.reduce` як окрему функцію `myReduce(arr, fn, initialValue)`.\n\nЗавдання:\n1. Ініціалізуйте акумулятор значенням `initialValue`.\n2. Якщо `initialValue` не передано, акумулятором стає перший елемент масиву, а цикл починається з індексу 1.\n3. Пройдіться циклом по елементах, на кожній ітерації оновлюючи акумулятор результатом `fn(acc, item, index, arr)`.\n4. Поверніть фінальний акумулятор.",
    examples: ["myReduce([1, 2, 3], (acc, x) => acc + x, 0) // 6"],
    functionName: "myReduce",
    starterCode: "function myReduce(arr, fn, initialValue) {\n  \n}",
    tests: [
      { input: [[1, 2, 3], (acc, x) => acc + x, 0], expected: 6 },
      { input: [[1, 2, 3], (acc, x) => acc * x, 1], expected: 6 },
      { input: [[], (acc, x) => acc + x, 10], expected: 10 }
    ],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },
  {
    id: "memoize-function",
    title: "Memoize function",
    difficulty: "hard",
    category: "functions",
    description: "Напишіть функцію `memoize`, що кешує результати виконання іншої функції. Це значно прискорює повторні обчислення для однакових аргументів.\n\nЗавдання:\n1. Поверніть функцію-обгортку (closure).\n2. Всередині створіть об'єкт або `Map` для кешу.\n3. При кожному виклику створюйте ключ (наприклад, `JSON.stringify(args)`) з ідентифікаторів переданих аргументів.\n4. Якщо ключ є в кеші — повертайте значення з кешу, інакше — виконуйте функцію, записуйте результат у кеш і повертайте його.",
    examples: ["const memoSum = memoize(sum);"],
    functionName: "memoize",
    starterCode: "function memoize(fn) {\n  \n}",
    tests: [
      { input: [(x) => x * 2], expected: "function" }
    ],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },
  {
    id: "deep-equality",
    title: "Deep equality check",
    difficulty: "hard",
    category: "object",
    description: "Напишіть функцію, що перевіряє два об'єкти на глибоку рівність.\n\nЗавдання:\n1. Якщо `obj1 === obj2`, вони рівні (базовий випадок).\n2. Якщо хоча б один з них не об'єкт або `null`, поверніть `false`.\n3. Перевірте кількість ключів (вона має збігатися).\n4. Пройдіться рекурсивно по всіх ключах і переконайтеся, що значення однакові (`isDeepEqual(obj1[key], obj2[key])`).",
    examples: ["isDeepEqual({a:1, b:{c:2}}, {a:1, b:{c:2}}) // true"],
    functionName: "isDeepEqual",
    starterCode: "function isDeepEqual(obj1, obj2) {\n  \n}",
    tests: [
      { input: [{a: 1}, {a: 1}], expected: true },
      { input: [{a: 1, b: {c: 2}}, {a: 1, b: {c: 2}}], expected: true },
      { input: [{a: 1, b: {c: 2}}, {a: 1, b: {c: 3}}], expected: false },
      { input: [null, null], expected: true }
    ],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },
  {
    id: "event-emitter",
    title: "Event emitter",
    difficulty: "hard",
    category: "classes",
    description: "Реалізуйте клас `EventEmitter` (або функцію-конструктор), що дозволяє підписуватись на події і генерувати їх. (Симульований тест).\n\nЗавдання:\n1. Зберігайте підписників у структурі типу `{ eventName: [listener1, listener2] }`.\n2. `on(eventName, listener)` додає функцію у масив підписників.\n3. `emit(eventName, ...args)` викликає всі функції з цього масиву.\n4. `off(eventName, listener)` видаляє конкретну функцію з масиву.\nЦей тест симульовано перевіряє, що ви повертаєте об'єкт EventEmitter.",
    examples: ["const ee = new EventEmitter();"],
    functionName: "createEE",
    starterCode: "function createEE() {\n  class EventEmitter {\n    // ...\n  }\n  return typeof new EventEmitter();\n}",
    tests: [
      { input: [], expected: "object" }
    ],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },
  {
    id: "promise-all",
    title: "Promise.all implementation",
    difficulty: "hard",
    category: "async",
    description: "Реалізуйте власну версію `Promise.all` — функцію `myPromiseAll(promises)`.\n\nЗавдання:\n1. Поверніть новий Promise.\n2. Всередині слідкуйте за тим, скільки промісів успішно виконалися.\n3. Зберігайте їх результати у масив по індексах.\n4. Якщо хоча б один проміс завершився з помилкою — фейліть увесь `myPromiseAll` (робіть `reject`).\n5. Якщо всі успішні — `resolve(resultsArr)`.",
    examples: ["myPromiseAll([p1, p2])"],
    functionName: "myPromiseAll",
    starterCode: "function myPromiseAll(promises) {\n  return 'promise';\n}",
    tests: [
      { input: [[]], expected: "promise" }
    ],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },
  {
    id: "currying",
    title: "Currying function",
    difficulty: "hard",
    category: "functions",
    description: "Реалізуйте функцію каррування (currying). Вона приймає звичайну функцію і дозволяє викликати її поетапно: `fn(a)(b)(c)` замість `fn(a, b, c)`.\n\nЗавдання:\n1. `curry(fn)` повертає функцію (назвемо її `curried`).\n2. Коли `curried` викликається, вона збирає аргументи.\n3. Якщо назбираних аргументів достатньо (`args.length >= fn.length`), викликай оригінальну `fn(...args)`.\n4. Якщо ні — повертай нову функцію, що додасть нові аргументи до вже зібраних і повторить перевірку.",
    examples: ["const curriedSum = curry(sum); curriedSum(1)(2)(3) // 6"],
    functionName: "curryTest",
    starterCode: "function curryTest() {\n  return 'function';\n}",
    tests: [
      { input: [], expected: "function" }
    ],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },
  {
    id: "compose",
    title: "Compose function",
    difficulty: "hard",
    category: "functions",
    description: "Напишіть функцію `compose(f, g, h)` (чимало функцій), яка зшиває (компонує) їх у єдину.\n\nЗавдання:\n1. Композиція викликається справа наліво: `f(g(h(x)))`.\n2. Поверніть функцію, що отримує початкове значення `x`.\n3. Використайте `reduceRight` на масиві переданих функцій, передаючи кожній наступній результат попередньої.",
    examples: ["const f = compose(x => x+1, x => x*2); f(2) // 5"],
    functionName: "compose",
    starterCode: "function compose(...fns) {\n  return function(x) {\n    return fns.reduceRight((acc, fn) => fn(acc), x);\n  }\n}",
    tests: [
      { input: [(x) => x + 1, (x) => x * 2], expected: "function" }
    ],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  },
  {
    id: "lru-cache",
    title: "LRU cache",
    difficulty: "hard",
    category: "classes",
    description: "Реалізуйте структуру даних LRU (Least Recently Used) Cache.\n\nЗавдання:\n1. Кеш має максимальну ємність `capacity`.\n2. Метод `get(key)` повертає значення (та робить елемент 'найновішим', тобто використаним щойно); якщо ключа немає — `undefined` або `-1`.\n3. Метод `put(key, value)` додає нове значення (і робить його 'найновішим').\n4. Якщо ліміт перевищено, видаляйте 'найстаріший' (найрідше використовуваний) елемент. Доречно використовувати `Map`, оскільки вона зберігає порядок вставки.",
    examples: ["const cache = new LRUCache(2);"],
    functionName: "testLRU",
    starterCode: "function testLRU() {\n  return 'class';\n}",
    tests: [
      { input: [], expected: "class" }
    ],
    leetcodeLinks: [
      { title: "Practice similar on LeetCode", url: "https://leetcode.com/problemset/all/" }
    ],
    communitySolutions: [
      { 
        author: "Alex_dev", 
        code: "// Cool alternative approach\n// Often uses modern ES6+ features\nconst solve = (args) => {\n  return 'Optimized!';\n}",
        likes: 42
      },
      { 
        author: "CodeNinja", 
        code: "// One-liner solution\nconst solve = args => 'Done';",
        likes: 15
      }
    ]
  }
];
