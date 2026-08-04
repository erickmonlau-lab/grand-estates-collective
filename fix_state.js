import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('liveValuation')) {
  const stateInsert = `
  const [valuatorSubmitted, setValuatorSubmitted] = useState(false);
  const [valuatorCalculating, setValuatorCalculating] = useState(false);
  const [liveValuation, setLiveValuation] = useState({
    active: false,
    total: 245000,
    min: 230000,
    max: 260000,
    zonaName: "",
    metros: 0
  });`;
  
  content = content.replace(
    'const [valuatorSubmitted, setValuatorSubmitted] = useState(false);',
    stateInsert
  );
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('State added!');
} else {
  console.log('State already exists!');
}
