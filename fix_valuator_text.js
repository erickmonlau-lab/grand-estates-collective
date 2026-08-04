import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// Fix subtitle text size inside Valuator section specifically
c = c.replace(
  'p className="text-white text-xl md:text-2xl lg:text-3xl font-bold leading-snug max-w-[580px] mb-3"',
  'p className="text-white text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-[540px] mb-3.5"'
);

// Fix title font size and tracking if needed
c = c.replace(
  'h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2.5 leading-[1.15] tracking-tight font-sans"',
  'h2 className="text-3xl sm:text-4xl font-black text-white mb-2.5 leading-tight font-sans"'
);

// Ensure proper padding inside the card container
c = c.replace(
  'div className="bg-[#005c99] rounded-[28px] md:rounded-[36px] shadow-2xl p-4 sm:p-4 md:p-5 mx-4 md:mx-auto max-w-[1300px] relative z-10 overflow-hidden text-white border border-white/10"',
  'div className="bg-[#005c99] rounded-[24px] md:rounded-[32px] shadow-2xl p-5 sm:p-6 md:p-8 mx-4 md:mx-auto max-w-[1300px] relative z-10 overflow-hidden text-white border border-white/10"'
);

fs.writeFileSync(filePath, c, 'utf8');
console.log('Valuator section text proportions fixed perfectly!');
