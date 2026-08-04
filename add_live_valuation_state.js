import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const target = 'const [valuatorCalculating, setValuatorCalculating] = useState(false);';
const replacement = `const [valuatorCalculating, setValuatorCalculating] = useState(false);
  const [liveValuation, setLiveValuation] = useState({
    active: false,
    total: 245000,
    min: 230000,
    max: 260000,
    zonaName: "",
    metros: 0
  });`;

content = content.replace(target, replacement);
fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully re-added liveValuation state!');
