export function optimizeCommand(command: string): string {
  if (!command) return '';

  let optimized = compressRepeatedCommands(command);

  optimized = compressRepeatedPatterns(optimized);

  return optimized;
}

function compressRepeatedCommands(command: string): string {
  let result = '';
  let currentChar = '';
  let count = 0;

  for (let i = 0; i <= command.length; i++) {
    const char = command[i];

    if (char === currentChar) {
      count++;
    } else {
      if (count > 0) {
        result += count > 1 ? `${count}${currentChar}` : currentChar;
      }
      currentChar = char;
      count = 1;
    }
  }

  return result;
}

function compressRepeatedPatterns(command: string): string {
  for (
    let patternLength = Math.floor(command.length / 2);
    patternLength >= 2;
    patternLength--
  ) {
    for (let i = 0; i <= command.length - 2 * patternLength; i++) {
      const pattern = command.substring(i, i + patternLength);
      let repeatCount = 0;
      let j = i;

      while (j <= command.length - patternLength) {
        if (command.substring(j, j + patternLength) === pattern) {
          repeatCount++;
          j += patternLength;
        } else {
          break;
        }
      }

      if (repeatCount >= 2) {
        const before = command.substring(0, i);
        const after = command.substring(j);

        return `${before}${repeatCount}(${pattern})${after}`;
      }
    }
  }

  return command;
}

/**
 * Expands an optimized command back to its full form for execution
 */
export function expandCommand(optimizedCommand: string): string {
  let expanded = '';
  let i = 0;

  while (i < optimizedCommand.length) {
    if (/\d/.test(optimizedCommand[i]) && optimizedCommand[i + 1] === '(') {
      const repeatCount = Number.parseInt(optimizedCommand[i]);

      let j = i + 2;
      let openParens = 1;

      while (j < optimizedCommand.length && openParens > 0) {
        if (optimizedCommand[j] === '(') openParens++;
        if (optimizedCommand[j] === ')') openParens--;
        j++;
      }

      const pattern = optimizedCommand.substring(i + 2, j - 1);
      const expandedPattern = expandCommand(pattern);

      for (let k = 0; k < repeatCount; k++) {
        expanded += expandedPattern;
      }

      i = j;
    } else if (
      /\d/.test(optimizedCommand[i]) &&
      i + 1 < optimizedCommand.length
    ) {
      const repeatCount = Number.parseInt(optimizedCommand[i]);
      const char = optimizedCommand[i + 1];

      for (let k = 0; k < repeatCount; k++) {
        expanded += char;
      }

      i += 2;
    } else {
      expanded += optimizedCommand[i];
      i++;
    }
  }

  return expanded;
}
