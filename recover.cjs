const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('C:\\Users\\erick\\.gemini\\antigravity\\brain\\a053c930-5ce4-4f70-8ce3-d377aae3ad60\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let latestContent = null;
  let modifications = []; // for multi_replace

  for await (const line of rl) {
    try {
      const step = JSON.parse(line);
      if (step.tool_calls) {
        for (const call of step.tool_calls) {
          if (call.tool_name === 'default_api:write_to_file' || call.tool_name === 'default_api:multi_replace_file_content') {
            const args = call.arguments;
            if (args.TargetFile && args.TargetFile.includes('index.tsx')) {
              if (call.tool_name === 'default_api:write_to_file') {
                 latestContent = args.CodeContent;
                 modifications = []; // reset modifications
              } else if (call.tool_name === 'default_api:multi_replace_file_content') {
                 // accumulate replacements? Actually, the transcript might just have the latest state if we re-apply them, but that's complex.
                 // Wait, did the agent use write_to_file or multi_replace?
                 // The agent probably used replace_file_content or multi_replace.
                 // If the agent never wrote the full file via write_to_file after the initial creation, we might only have diffs.
                 // But wait, the system prompt says "multi_replace_file_content".
                 // Let's just print out how many times it was written/modified.
                 console.log("Found modification: ", call.tool_name);
                 if (call.tool_name === 'default_api:write_to_file') {
                     fs.writeFileSync('recovered_index.tsx', args.CodeContent, 'utf8');
                     console.log("Saved full write!");
                 }
              }
            }
          }
        }
      }
    } catch (e) {}
  }
}

processLineByLine();
